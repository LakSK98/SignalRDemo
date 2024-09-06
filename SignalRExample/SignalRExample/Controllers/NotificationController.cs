using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace SignalRExample.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;
        
        public NotificationController(IHubContext<NotificationHub, INotificationClient> hubContext)
        {
            _hubContext = hubContext;
        }
        [HttpPost]
        public async Task<IActionResult> PostMessage(string message)
        {
            await _hubContext.Clients.All.ReceiveNotification($"--> {message}");
            return Ok();
        }
    }
}