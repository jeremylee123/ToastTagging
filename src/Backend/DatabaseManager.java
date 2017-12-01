package Backend;
import com.ibatis.common.jdbc.ScriptRunner;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Reader;
import java.sql.*;

//External Libraries
//JDBC - java database connector
//ibatis - run .sql scripts on the database



public class DatabaseManager {

    // JDBC driver name and database URL
    private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/Systems";

    //  Database credentials - defaults
    private static final String USER = "root";
    private static final String PASS = "root";

    private static void createDB() { //Make sure you have MySQL installed
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

    public static void main(String[] args) {
       //TODO: Database Testing
        DatabaseManager newDatabase = new DatabaseManager();
        newDatabase.createDB();
        newDatabase.importSystems();
    }

}





