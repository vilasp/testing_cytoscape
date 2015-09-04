using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(testing_cytoscape.Startup))]
namespace testing_cytoscape
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
