// FlightData.h
#ifndef FLIGHTDATA_H
#define FLIGHTDATA_H

#include <cstring>

class FlightData {
public:
    int altitude;              // Altitude above mean sea level (AMSL)
    int indicatedAirSpeed;     // Indicated Airspeed (IAS)
    int verticalSpeed;

    // Constructor to initialize the data
    FlightData(int alt, int ias, int vs)
        : altitude(alt), indicatedAirSpeed(ias), verticalSpeed(vs) {}

    // Possible methods for setting the values or behavior could be added here
    // e.g., void setAltitude(int alt) { altitude = alt; }
    // Function to serialize the data into a sendable buffer
    void toMessage(char* buffer, size_t bufferSize) const {
        if (bufferSize < sizeof(FlightData)) {
            // Handle error: The buffer is too small!
            return;
        }

        std::memcpy(buffer, this, sizeof(FlightData));
    }
};

#endif // FLIGHTDATA_H

