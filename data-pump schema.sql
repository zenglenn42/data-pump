CREATE DATABASE projectTest;
USE projectTest;
CREATE TABLE dummydata(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    case_number VARCHAR(255),
    case_status VARCHAR(255),
    charge VARCHAR(255),
    date VARCHAR(255),
    day VARCHAR(255),
    dl_status_incident VARCHAR(255),
    fatal_crash VARCHAR(255),
    hour VARCHAR(255),
    impaired_type VARCHAR(255),
    killed_driver_pass VARCHAR(255),
    location VARCHAR(255),
    location1_latitude DECIMAL(20,15),
    location1_longitude DECIMAL(20,15),
    month VARCHAR(255),
    of_fatalities VARCHAR(255),
    ran_red_light VARCHAR(255),
    related VARCHAR(255),
    restraint_helmet VARCHAR(255),
    sector VARCHAR(255),
    speeding VARCHAR(255),
    time VARCHAR(255),
    type VARCHAR(255),
    type_of_road VARCHAR(255),
    PRIMARY KEY (id)
);
