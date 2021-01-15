using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RWS.CloudDesktop.App.Controllers
{
    public class CRUDWindowController : Controller
    {
        // GET: CRUDWindow
        public ActionResult CRUD()
        {
            return View();
        }

        // GET: CRUDWindow/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CRUDWindow/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CRUDWindow/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: CRUDWindow/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CRUDWindow/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: CRUDWindow/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: CRUDWindow/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
