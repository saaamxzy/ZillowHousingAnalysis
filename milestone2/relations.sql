DECLARE @Property_types TABLE (Value VARCHAR(255));
INSERT INTO @Property_types VALUES("single family home");
INSERT INTO @Property_types VALUES("condo/co-op");

DECLARE @Room_nums TABLE (Value INT);
INSERT INTO @Room_nums VALUES(1);
INSERT INTO @Room_nums VALUES(2);
INSERT INTO @Room_nums VALUES(3);
INSERT INTO @Room_nums VALUES(4);
INSERT INTO @Room_nums VALUES(5);

CREATE TABLE Metro(
    ID INT NOT NULL,
    name VARCHAR(255),
    population INT,
    state_code CHAR(2),
    MHI FLOAT, -- Median House Income
    PRIMARY KEY(ID)
);

CREATE TABLE HomeValue(
    metro_ID INT NOT NULL,
    property_type VARCHAR(255) NOT NULL, 
    time_stamp DATE NOT NULL, 
    room_num INT NOT NULL, 
    price INT,
    PRIMARY KEY(metro_ID, property_type, time_stamp, room_num),
    FOREIGN KEY(metro_ID) REFERENCES Metro(ID),
    CONSTRAINT HomeValueCheck CHECK( property_type IN (SELECT * FROM @Property_types) AND room_num IN (SELECT * FROM @Room_nums) )
);

CREATE TABLE RentalPrice(
    metro_ID INT NOT NULL,
    property_type VARCHAR(255) NOT NULL, 
    time_stamp DATE NOT NULL, 
    price INT,
    prt_ratio FLOAT, -- Price-to-Rent Ratio
    PRIMARY KEY(metro_ID, property_type, time_stamp),
    FOREIGN KEY(metro_ID) REFERENCES Metro(ID),
    CHECK( property_type IN (SELECT * FROM @Property_types) )
);

CREATE TABLE SalesCount(
    metro_ID INT NOT NULL,
    property_type VARCHAR(255) NOT NULL, 
    time_stamp DATE NOT NULL, 
    num_sales INT,
    stl_ratio FLOAT, -- Sale-to-List Ratio
    PRIMARY KEY(metro_ID, property_type, time_stamp),
    FOREIGN KEY(metro_ID) REFERENCES Metro(ID),
    CHECK( property_type IN (SELECT * FROM @Property_types) )
)
