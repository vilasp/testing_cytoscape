using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using testing_cytoscape.Models;

namespace GetGraphElements
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class GetGraphElementSerive : IGetGraphElementsService
    {
        public GraphElementDO GetAllGraphElements(string value)
        {

            GraphElementDO geDO = new GraphElementDO();
            geDO.allNodes = PopulateNoder();
            geDO.allOvergangar = PopulateOvergangar();

            return geDO;
        }

        private List<Overgangar> PopulateOvergangar()
        {

            List<Overgangar> o = new List<Overgangar>();
            o.Add(new Overgangar("id1","node3","node5","hejsan","success"));
            
            return o;
        }

        private List<Noder> PopulateNoder()
        {
            List<Noder> n = new List<Noder>();
            n.Add(new Noder("1","ndoe1","skicka sms"));

            return n;
        }
    }
}
