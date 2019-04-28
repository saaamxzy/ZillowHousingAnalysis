-- DECLARE @Property_types TABLE (Value VARCHAR(255));
-- INSERT INTO @Property_types VALUES("single family home");
-- INSERT INTO @Property_types VALUES("condo/co-op");

-- DECLARE @Room_nums TABLE (Value INT);
-- INSERT INTO @Room_nums VALUES(1);
-- INSERT INTO @Room_nums VALUES(2);
-- INSERT INTO @Room_nums VALUES(3);
-- INSERT INTO @Room_nums VALUES(4);
-- INSERT INTO @Room_nums VALUES(5);

CREATE TABLE Metro(
    ID INT NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    state_code VARCHAR(13)
);

CREATE TABLE HomeValue(
    metro_ID INT NOT NULL,
    property_type VARCHAR(255) NOT NULL,
    time_stamp CHAR(7) NOT NULL, 
    room_num INT,
    price INT,
    CONSTRAINT PK_HomeValue PRIMARY KEY (metro_ID,property_type,time_stamp),
    CONSTRAINT FK_HomeValue FOREIGN KEY (metro_ID) REFERENCES Metro(ID)
);

CREATE TABLE RentalPrice(
    metro_ID INT NOT NULL,
    property_type VARCHAR(255) NOT NULL, 
    time_stamp CHAR(7) NOT NULL,
    room_num INT,
    price INT,
    CONSTRAINT PK_RentalPrice PRIMARY KEY (metro_ID, property_type, time_stamp),
    CONSTRAINT FK_RentalPrice FOREIGN KEY (metro_ID) REFERENCES Metro(ID)
);

CREATE TABLE SalesCount(
    metro_ID INT NOT NULL,
    property_type VARCHAR(255) NOT NULL, 
    time_stamp CHAR(7) NOT NULL, 
    num_sales INT,
    CONSTRAINT PK_SalesCount PRIMARY KEY (metro_ID, property_type, time_stamp),
    CONSTRAINT FK_SalesCount FOREIGN KEY (metro_ID) REFERENCES Metro(ID)
);

CREATE TABLE MHI(
    metro_ID INT NOT NULL,
    time_stamp CHAR(7) NOT NULL, 
    income FLOAT,
    CONSTRAINT PK_MHI PRIMARY KEY (metro_ID, time_stamp),
    CONSTRAINT FK_MHI FOREIGN KEY (metro_ID) REFERENCES Metro(ID)
);

CREATE TABLE PTR(
    metro_ID INT NOT NULL,
    time_stamp CHAR(7) NOT NULL, 
    ptr FLOAT,
    CONSTRAINT PK_PTR PRIMARY KEY (metro_ID, time_stamp),
    CONSTRAINT FK_PRT FOREIGN KEY (metro_ID) REFERENCES Metro(ID)
);

CREATE TABLE STL(
    metro_ID INT NOT NULL,
    time_stamp CHAR(7) NOT NULL, 
    stl FLOAT,
    CONSTRAINT PK_STL PRIMARY KEY (metro_ID, time_stamp),
    CONSTRAINT FK_STL FOREIGN KEY (metro_ID) REFERENCES Metro(ID)
);