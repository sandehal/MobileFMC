#include <iostream>
#include <string>
#include <cstring>

// Constants and variables
static const int num_dataStorage_variables = 8;
static std::string dataStorage[num_dataStorage_variables] = {
    "Value1",
    "Value2",
    "Value3",
    "Value4",
    "Value5",
    "Value6",
    "Value7",
    "Value8"
};

static std::string temp_storage[num_dataStorage_variables];

// Function prototypes
static int isNotChanged(const std::string& buffer, const std::string& storedData);
static int dataIsChanged();

// Function implementations
/// <summary>
/// Compares buffer and storedData
/// </summary>
/// <param name="buffer"></param>
/// <param name="storedData"></param>
/// <returns>If buffer and storedData deviate, false is returned. If they are the same, true is returned.</returns>
static int isNotChanged(const std::string& buffer, const std::string& storedData) {
    return (strcmp(storedData.c_str(), buffer.c_str()) == 0);
}

/// <summary>
/// Compares all the storedData-variables against the array of strings; dataList.
/// </summary>
/// <param name="dataList"></param>
/// <returns>If an element from the list is changed, true is returned. If they are all the same, false is returned.</returns>
static int dataIsChanged() {
    for (int i = 0; i < num_dataStorage_variables; i++) {
        if (!isNotChanged(temp_storage[i], dataStorage[i])) {
            std::cout << "Data changed: " << temp_storage[i] << std::endl;
            return 1;
        }
    }
    std::cout << "Data was not changed" << std::endl;
    return 0;
}

int main() {
    // Test Case 1: No change in data
    std::cout << "Test Case 1: No change in data" << std::endl;
    for (int i = 0; i < num_dataStorage_variables; i++) {
        temp_storage[i] = dataStorage[i];
    }
    if (dataIsChanged()) {
        std::cout << "Test Case 1 Failed" << std::endl;
    }
    else {
        std::cout << "Test Case 1 Passed" << std::endl;
    }

    // Test Case 2: Change in one data
    std::cout << "Test Case 2: Change in one data" << std::endl;
    temp_storage[2] = "ChangedValue";
    if (dataIsChanged()) {
        std::cout << "Test Case 2 Passed" << std::endl;
    }
    else {
        std::cout << "Test Case 2 Failed" << std::endl;
    }

    // Test Case 3: Change in all data
    std::cout << "Test Case 3: Change in all data" << std::endl;
    for (int i = 0; i < num_dataStorage_variables; i++) {
        temp_storage[i] = "NewValue" + std::to_string(i + 1);
    }
    if (dataIsChanged()) {
        std::cout << "Test Case 3 Passed" << std::endl;
    }
    else {
        std::cout << "Test Case 3 Failed" << std::endl;
    }

    return 0;
}
