import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const NotificationComponent = () => {
    
    const [connection, setConnection] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7265/notificationHub', {})
            .withAutomaticReconnect()
            .build();
            
        setConnection(newConnection);
    }, []);

    console.log(notifications);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.invoke('GetConnectionId')
                        .then(id => console.log('Connection ID:', id));
                    console.log('Connected');
                    connection.on('ReceiveNotification', (message) => {
                        console.log('Received message:', message, notifications)
                        setNotifications(prevNotifications => [...prevNotifications, message]);
                    })
                }).catch((e) => console.log("Connection failed:", e));
        }
    }, [connection]);

    return (
        <div>
            <h2>Notification</h2>
            <ul>
                {
                    notifications.map((notification, index) => <li key={index} >{notification}</li>)
                }
            </ul>
        </div>
    )

}

export default NotificationComponent;