import Backend.DatabaseManager;
import net.proteanit.sql.DbUtils;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;

public class ToastTagging {
    private JPanel mainFrame;
    private JTable resultSet;
    private JButton executeSQL;
    private JTextField sqlQuery;
    private JButton allSystemsButton;
    private JLabel resultSetLabel;
    private DatabaseManager manager = new DatabaseManager();

    public ToastTagging() {
        executeSQL.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if(sqlQuery.getText().length() > 0) {
                    String sql = sqlQuery.getText();
                        ResultSet rs = manager.sendQuery(sql);
                        if(rs == null) {
                            sqlQuery.setText("Invalid SQL Statement!");
                        } else {
                            resultSet.setModel(DbUtils.resultSetToTableModel(rs));
                        }
                }
            }
        });
        allSystemsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                ResultSet rs = manager.sendQuery("SELECT serialNumber, companyName, systemName, " +
                        "productFamily, model FROM system");
                if(rs == null) {
                    sqlQuery.setText("Invalid SQL Statement!");
                } else {
                    resultSet.setModel(DbUtils.resultSetToTableModel(rs));
                }
            }
        });
    }

    public static void main(String[] args) {
        JFrame toastTagging = new JFrame("Toast Tagging");
        toastTagging.setContentPane(new ToastTagging().mainFrame);
        toastTagging.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        toastTagging.setSize(600,620);
        toastTagging.setVisible(true);


    }
}

