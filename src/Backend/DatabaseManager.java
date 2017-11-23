package Backend;
import java.sql.*;
import java.util.Scanner;


public class DatabaseManager {

    // JDBC driver name and database URL
    private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/Systems";

    //  Database credentials - defaults
    private static final String USER = "root";
    private static final String PASS = "root";

    private static void createDB() { //Make sure you have MySQL installed. its a pain in the @$$
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

    //TODO: figure out how to implement this
    public static void addSystem() {
        Connection con = null;
        Statement stmt = null;
        try {
            //Register JDBC driver
            Class.forName(JDBC_DRIVER);

            //Open Connection
            System.out.println("Connecting to database...");
            con = DriverManager.getConnection(DB_URL, USER, PASS);

            //The MAGIC SQL Query
            String addSystemQuery = "";

            //Interfaces that send queries and return result sets
            System.out.println("Creating statement...");
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(addSystemQuery);

            System.out.println("Success system added to mysql table");

            //close all open connections
            rs.close(); //if a ResultSet was returned
            stmt.close(); //Close Statement
            con.close(); //Close Connection

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
        Scanner sc = new Scanner(System.in);
        System.out.print("Create database?: ");
        String answer = sc.next();
        answer = answer.toLowerCase();
        if(answer.equals("y") || answer.equals("yes")) {
            DatabaseManager csvImporter = new DatabaseManager();
            csvImporter.createDB();
        } else {
            System.out.println("Database not created...");
        }
    }

}





