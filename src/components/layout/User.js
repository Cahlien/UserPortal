import {  Table } from "react-bootstrap"

const User = ({ user }) => {
    console.log('User is receiving: ', user)

    return (
        <Table striped bordered hover shadow>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date of Birth</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.dateOfBirth}</td>
                </tr>
            </tbody>
        </Table>
    )
}
export default User
