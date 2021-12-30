<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%
Connection con;
try{
String firstname=request.getParameter("firstname");
String lastname=request.getParameter("lastname");
String add=request.getParameter("address");
String cityname=request.getParameter("city");
String statename=request.getParameter("state");
String coun=request.getParameter("country");
String pin=request.getParameter("pincode");
String user=request.getParameter("username");
String pass=request.getParameter("password");
Class.forName("com.mysql.jdbc.Driver");
con=DriverManager.getConnection("jdbc:mysql://localhost:3306/test","root","priya");
PreparedStatement ps=con.prepareStatement("insert into regs values(?,?,?,?,?,?,?,?,?)");
ps.setString(1,firstname);
ps.setString(2,lastname);
ps.setString(3,add);
ps.setString(4,cityname);
ps.setString(5,statename);
ps.setString(6,coun);
ps.setString(7,pin);
ps.setString(8,user);
ps.setString(9,pass);
ps.executeUpdate();
out.println("<h2>Record Registered Successfully...!</h2>"); 

response.sendRedirect("view1.jsp");

con.close();
ps.close();
  

}
catch(Exception e)
{
    out.println(e);
}
%>