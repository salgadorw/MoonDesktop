using System.Web.Optimization;

namespace RWS.CloudDesktop.App
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-3.5.1.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/desktop").Include(
                "~/Scripts/MoonDesktopBehavior.js", "~/Scripts/MoonUtils.js"));
            

            bundles.Add(new ScriptBundle("~/bundles/app").Include(              
                "~/Scripts/app/common.js",
                "~/Scripts/app/app.datamodel.js",
                "~/Scripts/app/app.viewmodel.js",
                "~/Scripts/app/home.viewmodel.js",
                "~/Scripts/app/_run.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/desktop").Include(
                 "~/Content/Desktop.css"
                 ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css"));
        }
    }
}
