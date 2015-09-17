using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testing_cytoscape.Models
{
    [Serializable]
    public class Noder
    {
        public long Id { get; set; }
        public string NodeName { get; set; }
        public string AktTypName { get; set; }
        public short AktTyp { get; set; }

        public Noder(long id,string nodeName,string aktTypName,short bla)
        {
            this.Id = id;
            this.NodeName = nodeName;
            this.AktTypName = aktTypName;
            this.AktTyp = bla;
        }
    }
}