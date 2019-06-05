# Zillow Housing Price Analysis

Author: Zhengyuan Xu
Collaborators: Zhiyuan Li, Shuqi Zhang, Wanci Yuan

## Motivation for the idea
Our project is interested in exploring the datasets of U.S. home’s sale prices and rental prices.
We will look at historical listing/sale prices of all types of homes across U.S. and try to find any
underlying trend. The same thing will be implemented to the rental price database. To interact
with both databases, we will try to compare the trends from both databases. By comparing
those databases, we hope to find relationship between house pricing and rental prices etc.

## Features implemented in this application
- Comparison between sales value and rental value across metros, with respect to time
stamps.
- Visualization of house pricing/sale pricing trend among years. (with graphs)
- Comparison between housing and rental prices of different property types
- Relation between rental price and price to rent ratio, and the relation between sales
count and sale to list ratio.

## Relation Schema (ER Diagram)
![Alt text](./figs/ER.png?raw=true)

## SQL commands to create the database
Refer to [here](./milestone2/Milestone2.pdf)

## Requirements for developers
- npm install 
- npm install oracledb
### Node-Oracle.js
Please Add Oracle 18, 12, or 11.2 client libraries to your operating system library search path such as
`PATH` on Windows or LD_LIBRARY_PATH on Linux. On macOS move the libraries to `~/lib` or `/usr/local/lib`. 
Refer to the Node-OracleDB [installation manual](https://oracle.github.io/node-oracledb/INSTALL.html#-2-quick-start-node-oracledb-installation)
on how to do this.

Other dependencies are settled within the html file headers.

## Information

- Database used: oracle db
- NoSQL used: not yet
- Server: Amazon Web Services (AWS) RDS
