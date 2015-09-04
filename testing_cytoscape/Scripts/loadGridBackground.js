$(function () {

    var gridStylesheet = {
    
        'background-color': '#FDFDFD',
        'background-size' : '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        'background-position' : '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
        'background-image': '-webkit-linear-gradient(#D5D5D0 0px, transparent 0px),webkit-linear-gradient(0, #D5D5D0 0px, transparent 0px),-webkit-linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px), -webkit-linear-gradient(0, rgba(187, 187, 187,.3) 1px, transparent 1px)',
        'background-image': '-moz-linear-gradient(#D5D5D0 0px, transparent 0px),-moz-linear-gradient(0, #D5D5D0 0px, transparent 0px),-moz-linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px),-moz-linear-gradient(0, rgba(187, 187, 187,.3) 1px, transparent 1px)',
        'background-image': 'linear-gradient(#D5D5D0 0px, transparent 0px),linear-gradient(90deg, #D5D5D0 0px, transparent 0px),linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px),linear-gradient(90deg, rgba(187, 187, 187,.3) 1px, transparent 1px)',
        '-pie-background': 'linear-gradient(#D5D5D0 0px, transparent 0px) -2px -2px / 100px,linear-gradient(90deg, #D5D5D0 0px, transparent 0px) -2px -2px / 100px,linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px) -1px -1px / 20px, linear-gradient(90deg, rgba(187, 187, 187,.3) 1px, transparent 1px) -1px -1px / 20px,#269'

    }

    $('#cy').css(gridStylesheet);
});
