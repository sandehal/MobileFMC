#if APL
#if defined(__MACH__)
#include <Carbon/Carbon.h>
#endif
#endif

#include <stdio.h>
#include <iostream>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <atomic>
#include <string.h>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h> // for thread functions
#include "XPLMProcessing.h"
#include "XPLMDataAccess.h"
#include "XPLMUtilities.h"
#include "XPLMPlanes.h"
#include "FlightData.h"

#include "single_include/nlohmann/json.hpp"
#pragma comment(lib, "ws2_32.lib")

using json = nlohmann::json;

#define SERVER_PORT 7878
#define CLIENT_PORT 7879
/* File to write data to. */
//static FILE* gOutputFile;
static SOCKET sendSock, recvSock;
static struct sockaddr_in server, client;

static std::queue<std::string> commandQueue;
static std::mutex queueMutex;
static std::condition_variable queueCV;
static std::atomic<bool> keepRunning(true);
static std::thread receiveThread;

static std::string clientIpAddress;

DWORD WINAPI ReceiveData(LPVOID lpParam);

/* Data refs we will record. */
const static int num_dataRefs = 35;

static XPLMDataRef		gPlaneLat;
static XPLMDataRef		gPlaneLon;
static XPLMDataRef		gPlaneEl;
static XPLMDataRef		gPlaneIAS;
static XPLMDataRef		gGearOnGround;
static XPLMDataRef		gPlaneVerticalSpeed;
static XPLMDataRef		gPlanePitch;

// Data refs for ZIBO 737 FMC
static XPLMDataRef		dataRefPageLabelLargeFont;
static XPLMDataRef		dataRefPageLabelSmallFont;

static XPLMDataRef		dataRefLine1LabelSmallFont;
static XPLMDataRef		dataRefLine2LabelSmallFont;
static XPLMDataRef		dataRefLine3LabelSmallFont;
static XPLMDataRef		dataRefLine4LabelSmallFont;
static XPLMDataRef		dataRefLine5LabelSmallFont;
static XPLMDataRef		dataRefLine6LabelSmallFont;

static XPLMDataRef		dataRefLine1Large;
static XPLMDataRef		dataRefLine2Large;
static XPLMDataRef		dataRefLine3Large;
static XPLMDataRef		dataRefLine4Large;
static XPLMDataRef		dataRefLine5Large;
static XPLMDataRef		dataRefLine6Large;

static XPLMDataRef		dataRefLine1LargeInverse;
static XPLMDataRef		dataRefLine2LargeInverse;
static XPLMDataRef		dataRefLine3LargeInverse;
static XPLMDataRef		dataRefLine4LargeInverse;
static XPLMDataRef		dataRefLine5LargeInverse;
static XPLMDataRef		dataRefLine6LargeInverse;

static XPLMDataRef		dataRefLine1Small;
static XPLMDataRef		dataRefLine2Small;
static XPLMDataRef		dataRefLine3Small;
static XPLMDataRef		dataRefLine4Small;
static XPLMDataRef		dataRefLine5Small;
static XPLMDataRef		dataRefLine6Small;

static XPLMDataRef		dataRefLine1Mag;
static XPLMDataRef		dataRefLine2Mag;
static XPLMDataRef		dataRefLine3Mag;
static XPLMDataRef		dataRefLine4Mag;
static XPLMDataRef		dataRefLine5Mag;
static XPLMDataRef		dataRefLine6Mag;

static XPLMDataRef		dataRefEntry;
static XPLMDataRef		dataRefEntryInverse;
static XPLMDataRef		dataRefExecLight;


static XPLMDataRef dataRefs[num_dataRefs] = { dataRefPageLabelLargeFont,
		dataRefPageLabelSmallFont,
		dataRefLine1LabelSmallFont,
		dataRefLine2LabelSmallFont,
		dataRefLine3LabelSmallFont,
		dataRefLine4LabelSmallFont,
		dataRefLine5LabelSmallFont,
		dataRefLine6LabelSmallFont,

		dataRefLine1Large,
		dataRefLine2Large,
		dataRefLine3Large,
		dataRefLine4Large,
		dataRefLine5Large,
		dataRefLine6Large,

		dataRefLine1LargeInverse,
		dataRefLine2LargeInverse,
		dataRefLine3LargeInverse,
		dataRefLine4LargeInverse,
		dataRefLine5LargeInverse,
		dataRefLine6LargeInverse,

		dataRefLine1Small,
		dataRefLine2Small,
		dataRefLine3Small,
		dataRefLine4Small,
		dataRefLine5Small,
		dataRefLine6Small,

		dataRefLine1Mag,
		dataRefLine2Mag,
		dataRefLine3Mag,
		dataRefLine4Mag,
		dataRefLine5Mag,
		dataRefLine6Mag,

		dataRefEntry,
		dataRefEntryInverse,
		dataRefExecLight
};

/*Performance enhancement-storage*/
static const int num_dataStorage_variables = 14;
static std::string storePageLarge;
static std::string storeLine1Large;
static std::string storeLine2Large;
static std::string storeLine3Large;
static std::string storeLine4Large;
static std::string storeLine5Large;
static std::string storeLine6Large;

static std::string storeLine1Mag;
static std::string storeLine2Mag;
static std::string storeLine3Mag;
static std::string storeLine4Mag;
static std::string storeLine5Mag;
static std::string storeLine6Mag;

static std::string storeEntry;

static std::string dataStorage[num_dataStorage_variables] = { storePageLarge,
	storeLine1Large,
	storeLine2Large,
	storeLine3Large,
	storeLine4Large,
	storeLine5Large,
	storeLine6Large,

	storeLine1Mag,
	storeLine2Mag,
	storeLine3Mag,
	storeLine4Mag,
	storeLine5Mag,
	storeLine6Mag,
	storeEntry
};

static std::string temp_storage[num_dataStorage_variables];


struct LiveData {
	//int altitude;
	//int speed;
	//int verticalSpeed;
	//float pitch;
	//float roll;
	std::string pageLarge;
	std::string pageSmall;
	std::string line1LabSmall;
	std::string line2LabSmall;
	std::string line3LabSmall;
	std::string line4LabSmall;
	std::string line5LabSmall;
	std::string line6LabSmall;

	std::string Line1Large;
	std::string Line2Large;
	std::string Line3Large;
	std::string Line4Large;
	std::string Line5Large;
	std::string Line6Large;
	std::string Line1LargeInverse;
	std::string Line2LargeInverse;
	std::string Line3LargeInverse;
	std::string Line4LargeInverse;
	std::string Line5LargeInverse;
	std::string Line6LargeInverse;

	std::string Line1Small;
	std::string Line2Small;
	std::string Line3Small;
	std::string Line4Small;
	std::string Line5Small;
	std::string Line6Small;

	std::string Line1Mag;
	std::string Line2Mag;
	std::string Line3Mag;
	std::string Line4Mag;
	std::string Line5Mag;
	std::string Line6Mag;

	std::string Entry;
	std::string EntryInverse;
	std::string ExecLight;


	// Convert your data class to JSON
	NLOHMANN_DEFINE_TYPE_INTRUSIVE(LiveData, 
		pageLarge, 
		pageSmall, 
		line1LabSmall, 
		line2LabSmall, 
		line3LabSmall, 
		line4LabSmall, 
		line5LabSmall, 
		line6LabSmall,
		Line1Large,
		Line2Large,
		Line3Large,
		Line4Large,
		Line5Large,
		Line6Large,
		Line1LargeInverse,
		Line2LargeInverse,
		Line3LargeInverse,
		Line4LargeInverse,
		Line5LargeInverse,
		Line6LargeInverse,
		Line1Small,
		Line2Small,
		Line3Small,
		Line4Small,
		Line5Small,
		Line6Small,

		Line1Mag,
		Line2Mag,
		Line3Mag,
		Line4Mag,
		Line5Mag,
		Line6Mag,

		Entry,
		EntryInverse,
		ExecLight
		)
};

static float processCommands(
	float                inElapsedSinceLastCall,
	float                inElapsedTimeSinceLastFlightLoop,
	int                  inCounter,
	void* inRefcon);

void enqueueCommand(const std::string& command) {
	std::lock_guard<std::mutex> lock(queueMutex);
	commandQueue.push(command);
	queueCV.notify_one();
}

static float processCommands(float inElapsedSinceLastCall, float inElapsedTimeSinceLastFlightLoop, int inCounter, void* inRefcon) {
	std::unique_lock<std::mutex> lock(queueMutex);

	while (!commandQueue.empty()) {
		std::string command = commandQueue.front();
		commandQueue.pop();

		lock.unlock();

		XPLMCommandRef cmdRef = XPLMFindCommand(command.c_str());
		if (cmdRef) {
			XPLMCommandOnce(cmdRef);
			XPLMDebugString("Command executed: ");
			XPLMDebugString(command.c_str());
			XPLMDebugString("\n");
		}
		else {
			XPLMDebugString("Invalid command: ");
			XPLMDebugString(command.c_str());
			XPLMDebugString("\n");
		}

		lock.lock();
	}

	return 0.3f;  // Return -1 to be called again on the next flight loop
}

DWORD WINAPI ReceiveData(LPVOID lpParam) {
	char buffer[1024];
	int clientLength = sizeof(client);

	while (keepRunning) {
		memset(buffer, 0, sizeof(buffer));
		int recvLen = recvfrom(recvSock, buffer, sizeof(buffer), 0, (struct sockaddr*)&client, &clientLength);
		if (recvLen == SOCKET_ERROR) {
			XPLMDebugString("Receive failed\n");
			continue;
		}

		buffer[recvLen] = '\0';

		try {
			json receivedData = json::parse(buffer);
			std::string debugJson = receivedData.dump();
			if (receivedData.contains("command")) {
				std::string command = receivedData["command"];
				enqueueCommand(command);
			}
			else if(receivedData.contains("request")) {
				std::string request = receivedData["request"];
				// Set clientIpaddress
				// Send ack back to the sender
				// Store the client's IP address

				char clientIp[INET_ADDRSTRLEN];
				inet_ntop(AF_INET, &client.sin_addr, clientIp, INET_ADDRSTRLEN);
				clientIpAddress = clientIp;
				XPLMDebugString("Received connection request from: ");
				XPLMDebugString(clientIpAddress.c_str());
				

				// Send acknowledgment back to the sender
				json ackMessage;
				ackMessage["command"] = "ack";
				std::string ackStr = ackMessage.dump();


				inet_pton(AF_INET, clientIp, &server.sin_addr);


				if (sendto(sendSock, ackStr.c_str(), ackStr.size(), 0, (struct sockaddr*)&server, sizeof(server)) < 0) {
					XPLMDebugString("Send of ack failed :(\n");
				}
				else {
					XPLMDebugString("Ack seems to have been sent! :)");
				}
			}

			else {
				XPLMDebugString("Invalid data received: no command field\n");
			}
		}
		catch (const std::exception& e) {
			XPLMDebugString("Data deserialization failed: ");
			XPLMDebugString(e.what());
			XPLMDebugString("\n");
		}
	}

	return 0;
}

#if APL && __MACH__
static int ConvertPath(const char* inPath, char* outPath, int outPathMaxLen);
#endif

static float	MyFlightLoopCallback(
	float                inElapsedSinceLastCall,
	float                inElapsedTimeSinceLastFlightLoop,
	int                  inCounter,
	void* inRefcon);

static float	DataRefsCallback(
	float                inElapsedSinceLastCall,
	float                inElapsedTimeSinceLastFlightLoop,
	int                  inCounter,
	void* inRefcon);



static void getFMCDataRefs() {
	dataRefs[0] = XPLMFindDataRef("laminar/B738/fmc1/Line00_L");
	dataRefs[1] = XPLMFindDataRef("laminar/B738/fmc1/Line00_S");
	dataRefs[2] = XPLMFindDataRef("laminar/B738/fmc1/Line01_X");
	dataRefs[3] = XPLMFindDataRef("laminar/B738/fmc1/Line02_X");
	dataRefs[4] = XPLMFindDataRef("laminar/B738/fmc1/Line03_X");
	dataRefs[5] = XPLMFindDataRef("laminar/B738/fmc1/Line04_X");
	dataRefs[6] = XPLMFindDataRef("laminar/B738/fmc1/Line05_X");
	dataRefs[7] = XPLMFindDataRef("laminar/B738/fmc1/Line06_X");

	dataRefs[8] = XPLMFindDataRef("laminar/B738/fmc1/Line01_L");
	dataRefs[9] = XPLMFindDataRef("laminar/B738/fmc1/Line02_L");
	dataRefs[10] = XPLMFindDataRef("laminar/B738/fmc1/Line03_L");
	dataRefs[11] = XPLMFindDataRef("laminar/B738/fmc1/Line04_L");
	dataRefs[12] = XPLMFindDataRef("laminar/B738/fmc1/Line05_L");
	dataRefs[13] = XPLMFindDataRef("laminar/B738/fmc1/Line06_L");

	dataRefs[14] = XPLMFindDataRef("laminar/B738/fmc1/Line01_I");
	dataRefs[15] = XPLMFindDataRef("laminar/B738/fmc1/Line02_I");
	dataRefs[16] = XPLMFindDataRef("laminar/B738/fmc1/Line03_I");
	dataRefs[17] = XPLMFindDataRef("laminar/B738/fmc1/Line04_I");
	dataRefs[18] = XPLMFindDataRef("laminar/B738/fmc1/Line05_I");
	dataRefs[19] = XPLMFindDataRef("laminar/B738/fmc1/Line06_I");

	dataRefs[20] = XPLMFindDataRef("laminar/B738/fmc1/Line01_S");
	dataRefs[21] = XPLMFindDataRef("laminar/B738/fmc1/Line02_S");
	dataRefs[22] = XPLMFindDataRef("laminar/B738/fmc1/Line03_S");
	dataRefs[23] = XPLMFindDataRef("laminar/B738/fmc1/Line04_S");
	dataRefs[24] = XPLMFindDataRef("laminar/B738/fmc1/Line05_S");
	dataRefs[25] = XPLMFindDataRef("laminar/B738/fmc1/Line06_S");

	dataRefs[26] = XPLMFindDataRef("laminar/B738/fmc1/Line01_M");
	dataRefs[27] = XPLMFindDataRef("laminar/B738/fmc1/Line02_M");
	dataRefs[28] = XPLMFindDataRef("laminar/B738/fmc1/Line03_M");
	dataRefs[29] = XPLMFindDataRef("laminar/B738/fmc1/Line04_M");
	dataRefs[30] = XPLMFindDataRef("laminar/B738/fmc1/Line05_M");
	dataRefs[31] = XPLMFindDataRef("laminar/B738/fmc1/Line06_M");

	dataRefs[32] = XPLMFindDataRef("laminar/B738/fmc1/Line_entry");
	dataRefs[33] = XPLMFindDataRef("laminar/B738/fmc1/Line_entry_I");
	dataRefs[34] = XPLMFindDataRef("laminar/B738/indicators/fms_exec_light_pilot");
}

/// <summary>
/// Compares buffer and storedData
/// </summary>
/// <param name="buffer"></param>
/// <param name="storedData"></param>
/// <returns>If buffer and storedData deviate, false is returned. If they are the same, true is returned.</returns>
static int isNotChanged(std::string buffer, std::string storedData) {
	return (strcmp(storedData.c_str(), buffer.c_str()) == 0);
}

/// <summary>
/// Compares all the storedData-variables against the array of strings; dataList.
/// </summary>
/// <param name="dataList"></param>
/// <returns>If an element from the list is changed, true is returned. If they are all the same, false is returned.</returns>
static int dataIsChanged() {
	for (int i = 0; i < num_dataStorage_variables; i++) {
		if (!isNotChanged(temp_storage[i].c_str(), dataStorage[i])) {
			XPLMDebugString(temp_storage[i].c_str()); XPLMDebugString("\n"); 
			XPLMDebugString(dataStorage[i].c_str()); XPLMDebugString("\n");
			return 1;
		}
	}
	return 0;
}

PLUGIN_API int XPluginStart(
	char* outName,
	char* outSig,
	char* outDesc)
{
	char	outputPath[255];
#if APL && __MACH__
	char outputPath2[255];
	int Result = 0;
#endif

	strcpy(outName, "SimData");
	strcpy(outSig, "xplanesdk.examples.SimData");
	strcpy(outDesc, "A plugin that records sim data.");

	/* Open a file to write to.  We locate the X-System directory
	 * and then concatenate our file name.  This makes us save in
	 * the X-System directory.  Open the file. */
	XPLMGetSystemPath(outputPath);
	strcat(outputPath, "TimedProcessing.txt");


	// Initialize Winsock
	WSADATA wsa;
	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
		XPLMDebugString("Winsock initialization failed\n");
		return 0;
}

	// Create socket
	if ((sendSock = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
		XPLMDebugString("Could not create socket\n");
		return 0;
	}

	// Set client ip here. Temporarily set to any.
	server.sin_addr.s_addr = INADDR_ANY;
	server.sin_family = AF_INET;
	server.sin_port = htons(SERVER_PORT);

	if ((recvSock = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
		XPLMDebugString("Could not create receiving socket\n");
		return 0;
	}

	client.sin_addr.s_addr = INADDR_ANY;
	client.sin_family = AF_INET;
	client.sin_port = htons(CLIENT_PORT);

	if (bind(recvSock, (struct sockaddr*)&client, sizeof(client)) == SOCKET_ERROR) {
		XPLMDebugString("Bind failed\n");
		return 0;
	}
#if APL && __MACH__
	Result = ConvertPath(outputPath, outputPath2, sizeof(outputPath));
	if (Result == 0)
		strcpy(outputPath, outputPath2);
	else
		XPLMDebugString("TimedProccessing - Unable to convert path\n");
#endif



	//FMC get datarefs
	/*while (!dataRefs[0]) {
		getFMCDataRefs();
	}*/
	XPLMRegisterFlightLoopCallback(
		DataRefsCallback,
		1.0f,
		NULL
		);
	XPLMDebugString("Datarefs for SIMDATA: FETCHED\n");

	/* Register our callback for once a second.  Positive intervals
	 * are in seconds, negative are the negative of sim frames.  Zero
	 * registers but does not schedule a callback for time. */
	XPLMRegisterFlightLoopCallback(
		MyFlightLoopCallback,	/* Callback */
		0.3f,					/* Interval */
		NULL);					/* refcon not used. */

	receiveThread = std::thread(ReceiveData, nullptr);
	XPLMRegisterFlightLoopCallback(processCommands, 0.3f, NULL);
	return 1;
}

PLUGIN_API void	XPluginStop(void)
{

	// Send disconnect command back to the sender
	json discMessage;
	discMessage["command"] = "disconnect";
	std::string discStr = discMessage.dump();


	if (sendto(sendSock, discStr.c_str(), discStr.size(), 0, (struct sockaddr*)&server, sizeof(server)) < 0) {
		XPLMDebugString("Send of disconnect failed :(\n");
	}
	else {
		XPLMDebugString("Disconnect seems to have been sent! :)");
	}



	keepRunning = false;
	if (receiveThread.joinable()) {
		receiveThread.join();
	}

	keepRunning = false;
	queueCV.notify_all();

	closesocket(sendSock);
	closesocket(recvSock);
	WSACleanup();
	///* Unregister the callback */
	XPLMUnregisterFlightLoopCallback(MyFlightLoopCallback, NULL);
	XPLMUnregisterFlightLoopCallback(DataRefsCallback, NULL);

	///* Close the file */
	//fclose(gOutputFile);
}

PLUGIN_API void XPluginDisable(void)
{
}

PLUGIN_API int XPluginEnable(void)
{

	//FMC get datarefs
	/*getFMCDataRefs();*/
	return 1;
}

PLUGIN_API void XPluginReceiveMessage(
	XPLMPluginID	inFromWho,
	int				inMessage,
	void* inParam)
{
}

float	MyFlightLoopCallback(
	float                inElapsedSinceLastCall,
	float                inElapsedTimeSinceLastFlightLoop,
	int                  inCounter,
	void* inRefcon)
{

	LiveData data;
	
	char buffer[25];
	float execLight;

	if (clientIpAddress.empty()) {
		XPLMDebugString("Client ipaddress is empty");
		return 1.0f;
	}

	if (!dataRefs[0]) return 1.0f;

	

	for (int i = 0; i < num_dataRefs; i++) {
		if (dataRefs[i]) {
			if (i != 34) {
				memset(buffer, ' ', sizeof(char) * 24);
				XPLMGetDatab(dataRefs[i], buffer, 0, sizeof(buffer) - 1);
				buffer[24] = '\0';
				std::string msg = std::to_string(i) + ": ";
				XPLMDebugString(msg.c_str());
				XPLMDebugString(buffer);
				XPLMDebugString("\n");
			}
			else {
				execLight = XPLMGetDataf(dataRefs[i]);
				XPLMDebugString(std::to_string(execLight).c_str());
			}

			switch (i) {
			case 0: {
				data.pageLarge = std::string(buffer);
				temp_storage[0] = data.pageLarge;
				break;
			}
			case 1: data.pageSmall = std::string(buffer); break;
			case 2: data.line1LabSmall = std::string(buffer); break;
			case 3: data.line2LabSmall = std::string(buffer); break;
			case 4: data.line3LabSmall = std::string(buffer); break;
			case 5: data.line4LabSmall = std::string(buffer); break;
			case 6: data.line5LabSmall = std::string(buffer); break;
			case 7: data.line6LabSmall = std::string(buffer); break;
			case 8: { data.Line1Large = std::string(buffer); temp_storage[1] = data.Line1Large; break; }
			case 9: { data.Line2Large = std::string(buffer); temp_storage[2] = data.Line2Large; break; }
			case 10: { data.Line3Large = std::string(buffer); temp_storage[3] = data.Line3Large; break; }
			case 11: { data.Line4Large = std::string(buffer); temp_storage[4] = data.Line4Large; break; }
			case 12: { data.Line5Large = std::string(buffer); temp_storage[5] = data.Line5Large; break; }
			case 13: { data.Line6Large = std::string(buffer); temp_storage[6] = data.Line6Large; break; }
			case 14: data.Line1LargeInverse = std::string(buffer); break;
			case 15: data.Line2LargeInverse = std::string(buffer); break;
			case 16: data.Line3LargeInverse = std::string(buffer); break;
			case 17: data.Line4LargeInverse = std::string(buffer); break;
			case 18: data.Line5LargeInverse = std::string(buffer); break;
			case 19: data.Line6LargeInverse = std::string(buffer); break;
			case 20: data.Line1Small = std::string(buffer); break;
			case 21: data.Line2Small = std::string(buffer); break;
			case 22: data.Line3Small = std::string(buffer); break;
			case 23: data.Line4Small = std::string(buffer); break;
			case 24: data.Line5Small = std::string(buffer); break;
			case 25: data.Line6Small = std::string(buffer); break;
			case 26: data.Line1Mag = std::string(buffer); temp_storage[7] = data.Line1Mag; break;
			case 27: data.Line2Mag = std::string(buffer); temp_storage[8] = data.Line2Mag; break;
			case 28: data.Line3Mag = std::string(buffer); temp_storage[9] = data.Line3Mag; break;
			case 29: data.Line4Mag = std::string(buffer); temp_storage[10] = data.Line4Mag; break;
			case 30: data.Line5Mag = std::string(buffer); temp_storage[11] = data.Line5Mag; break;
			case 31: data.Line6Mag = std::string(buffer); temp_storage[12] = data.Line6Mag; break;
			case 32: {data.Entry = std::string(buffer); temp_storage[13] = data.Entry; break;}
			case 33: data.EntryInverse = std::string(buffer); break;
			case 34: { data.ExecLight = execLight; break; }
			}
		}
		else {
		}
	}
	// Callback checks again
	if (!dataIsChanged()) {
		return 0.3f;
	}
	/*else {
		XPLMDebugString("Data was changed");
	}*/
	// Data has changed and we prepare package sendation
	for (int i = 0; i < num_dataStorage_variables; i++) {
		dataStorage[i] = temp_storage[i];
	}

	json j;
	try {
		j = data;
	}
	catch (const std::exception& e) {
		XPLMDebugString("Data serialization failed: ");
		XPLMDebugString(e.what());
		XPLMDebugString("\n");
		return 0.3;  // Return to avoid further execution
	}

	std::string serializedData = j.dump();

	if (sendto(sendSock, serializedData.c_str(), serializedData.size(), 0, (struct sockaddr*)&server, sizeof(server)) < 0) {
		XPLMDebugString("Send failed\n");
	}

	return 0.3f;
}

float DataRefsCallback(float inElapsedSinceLastCall, float inElapsedTimeSinceLastFlightLoop, int inCounter, void* inRefcon)
{
	dataRefs[0] = XPLMFindDataRef("laminar/B738/fmc1/Line00_L");
	if (!dataRefs[0]) {
		return 1.0f;
	}
	dataRefs[1] = XPLMFindDataRef("laminar/B738/fmc1/Line00_S");
	dataRefs[2] = XPLMFindDataRef("laminar/B738/fmc1/Line01_X");
	dataRefs[3] = XPLMFindDataRef("laminar/B738/fmc1/Line02_X");
	dataRefs[4] = XPLMFindDataRef("laminar/B738/fmc1/Line03_X");
	dataRefs[5] = XPLMFindDataRef("laminar/B738/fmc1/Line04_X");
	dataRefs[6] = XPLMFindDataRef("laminar/B738/fmc1/Line05_X");
	dataRefs[7] = XPLMFindDataRef("laminar/B738/fmc1/Line06_X");

	dataRefs[8] = XPLMFindDataRef("laminar/B738/fmc1/Line01_L");
	dataRefs[9] = XPLMFindDataRef("laminar/B738/fmc1/Line02_L");
	dataRefs[10] = XPLMFindDataRef("laminar/B738/fmc1/Line03_L");
	dataRefs[11] = XPLMFindDataRef("laminar/B738/fmc1/Line04_L");
	dataRefs[12] = XPLMFindDataRef("laminar/B738/fmc1/Line05_L");
	dataRefs[13] = XPLMFindDataRef("laminar/B738/fmc1/Line06_L");

	dataRefs[14] = XPLMFindDataRef("laminar/B738/fmc1/Line01_I");
	dataRefs[15] = XPLMFindDataRef("laminar/B738/fmc1/Line02_I");
	dataRefs[16] = XPLMFindDataRef("laminar/B738/fmc1/Line03_I");
	dataRefs[17] = XPLMFindDataRef("laminar/B738/fmc1/Line04_I");
	dataRefs[18] = XPLMFindDataRef("laminar/B738/fmc1/Line05_I");
	dataRefs[19] = XPLMFindDataRef("laminar/B738/fmc1/Line06_I");

	dataRefs[20] = XPLMFindDataRef("laminar/B738/fmc1/Line01_S");
	dataRefs[21] = XPLMFindDataRef("laminar/B738/fmc1/Line02_S");
	dataRefs[22] = XPLMFindDataRef("laminar/B738/fmc1/Line03_S");
	dataRefs[23] = XPLMFindDataRef("laminar/B738/fmc1/Line04_S");
	dataRefs[24] = XPLMFindDataRef("laminar/B738/fmc1/Line05_S");
	dataRefs[25] = XPLMFindDataRef("laminar/B738/fmc1/Line06_S");
	dataRefs[26] = XPLMFindDataRef("laminar/B738/fmc1/Line01_M");
	dataRefs[27] = XPLMFindDataRef("laminar/B738/fmc1/Line02_M");
	dataRefs[28] = XPLMFindDataRef("laminar/B738/fmc1/Line03_M");
	dataRefs[29] = XPLMFindDataRef("laminar/B738/fmc1/Line04_M");
	dataRefs[30] = XPLMFindDataRef("laminar/B738/fmc1/Line05_M");
	dataRefs[31] = XPLMFindDataRef("laminar/B738/fmc1/Line06_M");

	dataRefs[32] = XPLMFindDataRef("laminar/B738/fmc1/Line_entry");
	dataRefs[33] = XPLMFindDataRef("laminar/B738/fmc1/Line_entry_I");
	dataRefs[34] = XPLMFindDataRef("laminar/B738/indicators/fms_exec_light_pilot");
	return 0.0f;
}

#if APL && __MACH__
#include <Carbon/Carbon.h>
int ConvertPath(const char* inPath, char* outPath, int outPathMaxLen)
{
	CFStringRef inStr = CFStringCreateWithCString(kCFAllocatorDefault, inPath, kCFStringEncodingMacRoman);
	if (inStr == NULL)
		return -1;
	CFURLRef url = CFURLCreateWithFileSystemPath(kCFAllocatorDefault, inStr, kCFURLHFSPathStyle, 0);
	CFStringRef outStr = CFURLCopyFileSystemPath(url, kCFURLPOSIXPathStyle);
	if (!CFStringGetCString(outStr, outPath, outPathMaxLen, kCFURLPOSIXPathStyle))
		return -1;
	CFRelease(outStr);
	CFRelease(url);
	CFRelease(inStr);
	return 0;
}
#endif