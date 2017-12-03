package Backend;
import com.ibatis.common.jdbc.ScriptRunner;
import com.mysql.jdbc.exceptions.MySQLSyntaxErrorException;

import javax.management.Query;
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

    private static void importSystems() {
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

    public static ResultSet sendQuery(String sqlQuery) throws NullPointerException {
        Connection con = null;
        Statement stmt = null;

        try {
            //Register JDBC driver
            Class.forName(JDBC_DRIVER);

            //Open Connection
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/toasttagging", "root", "root");

            //create the java statement
            stmt = con.prepareStatement(sqlQuery);

            //Execute and get the result set
            ResultSet rs = stmt.executeQuery(sqlQuery);

            //close all open connections
            //stmt.close(); //Close Statement
            //con.close(); //Close Connection

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

                System.out.println(serialNumber + " " + companyName +  " " + systemName + " "
                        + productFamily + " " + model);

            }
        } catch (SQLException e) {
            System.err.println("Got an exception!");
            System.err.println(e.getMessage());
        }
    }

    public static void main(String[] args) throws SQLException {
        DatabaseManager systemsDatabase = new DatabaseManager();
        //systemsDatabase.createDB();
        //systemsDatabase.importSystems();
        //systemsDatabase.getAllSystems();
        //printResults(sendQuery("SELECT * FROM system"));
    }

}





