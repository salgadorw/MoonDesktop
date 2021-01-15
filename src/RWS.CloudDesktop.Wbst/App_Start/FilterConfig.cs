using System.Web;
using System.Web.Mvc;

namespace RWS.CloudDesktop.Wbst
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
