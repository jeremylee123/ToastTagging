package Backend;
import com.ibatis.common.jdbc.ScriptRunner;

import javax.xml.transform.Result;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Reader;
import java.sql.*;
import java.util.Scanner;
import java.lang.System;

public class DatabaseManager {

    // JDBC driver name and database URL
    private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/Systems";

    //  Database credentials - defaults
    private static final String USER = "root";
    private static final String PASS = "root";

    private static void createDB() {
        Connection con = null;
        Statement stmt = null;
        try {
            //Register JDBC driver
            Class.forName(JDBC_DRIVER);

            //Open Connection
            System.out.println("Creating database...");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306", "root", "root");
            //Create Database Query
            String create_DB = "CREATE DATABASE Systems";
            stmt = con.createStatement();
            stmt.executeUpdate(create_DB);

            //close all open connections
            stmt.close(); //Close Statement
            con.close(); //Close Connection

            //yay, now go into mysql workbench and connect to it
            System.out.println("Database creation Successful...");
        }catch(SQLException se){
            //errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
            //errors for Class.forName
            e.printStackTrace();
        }finally{
            //Close resources
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }// nothing we can do
            try{
                if(con!=null)
                    con.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }

    public static void importSystems() {
        Connection con = null;
        Statement stmt = null;
        String SQLScriptFilePath = "files/systems.sql";

        try {
            //Register JDBC driver
            Class.forName(JDBC_DRIVER);

            //Open Connection
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306", "root", "root");

            //import systems from .sql file
            ScriptRunner sr = new ScriptRunner(con, false,false);

            //give input file to reader
            Reader reader = new BufferedReader(
                    new FileReader(SQLScriptFilePath));

            //execute script
            sr.runScript(reader);

        }catch(SQLException se){
            //errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
            //errors for Class.forName
            e.printStackTrace();
        }finally{
            //Close resources
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }// nothing we can do
            try{
                if(con!=null)
                    con.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }

    private static ResultSet getAllSystems() {
        Connection con = null;
        Statement stmt = null;
        try {
            //Register JDBC driver
            Class.forName(JDBC_DRIVER);

            //Open Connection
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/Systems", "root", "root");

            //Create Database Query
            String getSystems = "SELECT * FROM systems";

            //create the java statement
            stmt = con.createStatement();

            //Execute and get the result set
            ResultSet rs = stmt.executeQuery(getSystems);

            //print the result set
            printResults(rs);

            //close all open connections
            stmt.close(); //Close Statement
            con.close(); //Close Connection

            //return result set
            return rs;

        }catch(Exception e){
            //errors for Class.forName
            e.printStackTrace();
        }
        return null;
    }

    public static void printResults(ResultSet rs) throws SQLException {
        try {
            while (rs.next()) {
                //just an example usage, more attributes can be easily added.
                String companyName = rs.getString("companyName");
                String systemName = rs.getString("systemName");
                String serialNumber = rs.getString("serialNumber");
                String productFamily = rs.getString("productFamily");
                String model = rs.getString("model");

                System.out.format("| Company Name: %s | System Name: %s | Serial Number: %s | Product Family: %s | Model: %s |\n", companyName,
                        systemName, serialNumber, productFamily, model);
            }
        } catch (SQLException e) {
            System.err.println("Got an exception!");
            System.err.println(e.getMessage());
        }
    }

    public static void main(String[] args) {
        DatabaseManager systemsDatabase = new DatabaseManager();
        //systemsDatabase.createDB();
        //systemsDatabase.importSystems();
        systemsDatabase.getAllSystems();
    }

}





