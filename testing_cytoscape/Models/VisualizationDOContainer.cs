using System;
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace testing_cytoscape.Models
{
    [DataContract]
    public class FsdHaemtaProcessElement
    {
        [DataMember]
        public List<Overgangar> overgangarIProcess { get; set; }

        [DataMember]
        public List<Noder> noderIProcess { get; set; }

    }
}