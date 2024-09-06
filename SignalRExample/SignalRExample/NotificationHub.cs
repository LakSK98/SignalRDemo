using Microsoft.AspNetCore.SignalR;

namespace SignalRExample
{
    public interface INotificationClient
    {
        Task ReceiveNotification(string message);
    }
    public class NotificationHub : Hub<INotificationClient>
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.All.ReceiveNotification($"Thank you for connecting {Context.ConnectionId}");
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
