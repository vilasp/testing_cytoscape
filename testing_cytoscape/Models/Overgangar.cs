using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testing_cytoscape.Models
{
    public class Overgangar
    {
        public long FranNode { get; set; }
        public long TillNode { get; set; }
        public string UtFallVärdeNamn { get; set; }

        public Overgangar(long franNode,long tillNode,string utFallVärdeNamn) 
        {
            this.FranNode = franNode;
            this.TillNode = tillNode;
            this.UtFallVärdeNamn = utFallVärdeNamn;
        }
    }
}