<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="testing_cytoscape.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
       <script src="http://cytoscape.github.io/cytoscape.js/api/cytoscape.js-latest/cytoscape.min.js" type="text/javascript"></script>
        <script src="http://cpettitt.github.io/project/dagre/latest/dagre.min.js"></script>
        <script src="Scripts/cytoscape_data.js" type="text/javascript"></script>
        <script src="Scripts/loadGridBackground.js" type="text/javascript"></script>
    <div id="main-cy-container">
        <div id="cy"></div>
        <div id="option-field">

            <div class="option-container">
                <h5>Change layout algorithm</h5>
                <select id="layout-select">
	    		    <option value="grid">Grid</option>
	    		    <option value="random">Random</option>
	    		    <option value="springy">Springy</option>
	    		    <option value="arbor" selected="">Arbor</option>
	    		    <option value="circle">Circle</option>
                    <option value="dagre">Dagre</option>
	    		    <option value="breadthfirst">Breadth first</option>
	    		    <option value="null">Null</option>
	    	    </select>
                <button id="layout-button">Apply</button>
            </div>

            <div class="option-container">
                <h5>Enter workflow id</h5>
                    <asp:TextBox ID="processIDTextbox" runat="server"></asp:TextBox>
                    <asp:Button ID="getGraphButton" Text="Get workflow" runat="server"  ></asp:Button>
                    
            </div>
            <div class="option-container">
                <Button id="storeGraph">Store graph</Button>
            </div>
            <div class="option-container">
                <Button id="loadGraph">Load graph</Button>
            </div>
        </div>
    </div>
    
</asp:Content>
