using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(RWS.CloudDesktop.App.Startup))]

namespace RWS.CloudDesktop.App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
