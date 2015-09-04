using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using testing_cytoscape.Models;
using System.Web.Script.Serialization;
namespace testing_cytoscape
{
    public partial class About : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            getGraphButton.Click += GetGraph_Btn_Click;
        }
        protected void GetGraph_Btn_Click(object sender, EventArgs e)
        {

            //Get reference to service


            //Get DO from service

            string a = processIDTextbox.Text;
            //Serialize the lists in DO to JSON

            List<Noder> listOfNodes = new List<Noder>();
            listOfNodes.Add(new Noder(1, "Jerry", "a",0));
            listOfNodes.Add(new Noder(2, "Elaine", "a",2));
            listOfNodes.Add(new Noder(3, "Kramer", "a",2));
            listOfNodes.Add(new Noder(4, "George", "a",1));

            var nodes = new JavaScriptSerializer().Serialize(listOfNodes);

            List<Overgangar> listOfOvergangar = new List<Overgangar>();
            listOfOvergangar.Add(new Overgangar(1, 2, "1"));
            listOfOvergangar.Add(new Overgangar(1, 3, "1"));
            listOfOvergangar.Add(new Overgangar(1, 4, "1"));
            listOfOvergangar.Add(new Overgangar(2, 1, "1"));
            listOfOvergangar.Add(new Overgangar(2, 3, "1"));
            listOfOvergangar.Add(new Overgangar(3, 1, "1"));
            listOfOvergangar.Add(new Overgangar(3, 2, "1"));
            listOfOvergangar.Add(new Overgangar(3, 4, "1"));
            listOfOvergangar.Add(new Overgangar(4, 1, "1"));

            var edges = new JavaScriptSerializer().Serialize(listOfOvergangar);

            //Create javascript function which is executed on page reload
            string initGraph = "initGraph(" + nodes + "," + edges + ",false)";

            //Create a new pageLoad script with the DO lists as input
            ScriptManager.RegisterStartupScript(this,GetType(),"drawGraph",initGraph,true);
        }

        protected void LoadExistingProcess_Btn_Click()
        {

        }
        protected void StoreProcess_Btn_Click()
        {
            //Get JSON representation of cy core object in hidden value field

            //Use delegate to store JSON in DB


        }
    }
}