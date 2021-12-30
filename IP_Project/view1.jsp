<%@page import="java.sql.*" %>

  <%@page contentType="text/html" pageEncoding="UTF-8" %>
    <html>

    <head>

      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style>
        table,
        th,
        td {
          border: 1px solid black;
        }

        table {
          width: 100%;
        }
        body{
          background-color: rgb(80, 226, 178);
        }
      </style>
      <title>View Page</title>

    </head>

    <body>
      <table border="1">

        <tr>
          <th>Fistname
          </th>
          <th>Lastname</th>

          <th>Address</th>

          <th>City</th>

          <th>State</th>

          <th>Country</th>
          <th>Pincode</th>
          <th>Username</th>
          <th>Password</th>
        </tr>
        <% try{ Class.forName("com.mysql.jdbc.Driver"); Connection
          con=DriverManager.getConnection("jdbc:mysql://localhost:3306/test","root","priya"); Statement
          st=con.createStatement(); String sql="Select * from regs" ; ResultSet rs=st.executeQuery(sql);
          while(rs.next()) { %>

          <tr>

            <td>
              <%=rs.getString("firstname")%>
            </td>

            <td>
              <%=rs.getString("lastname")%>
            </td>

            <td>
              <%=rs.getString("address")%>
            </td>

            <td>
              <%=rs.getString("city")%>
            </td>

            <td>
              <%=rs.getString("state")%>
            </td>
            <td>
              <%=rs.getString("country")%>
            </td>
            <td>
              <%=rs.getString("pincode")%>
            </td>

            <td>
              <%=rs.getString("username")%>
            </td>

            <td>
              <%=rs.getString("password")%>
            </td>

          </tr>

          <% } } catch (Exception e) { e.printStackTrace(); } %>

      </table>

    </body>

    </html>