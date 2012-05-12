const left = 0;
const right = 2;
const middle = 1;
const St = imports.gi.St;
const Lang = imports.lang;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;
const Tweener = imports.ui.tweener;
const MessageTray = imports.ui.messageTray;
const temp_hideTray;



/* EDIT THESE VALUES ################################################################## */

// The commented stuff in the end of each line is examples of available values.

const CORNER_TL = false; // true, false
const CORNER_TR = false; // true, false
const CORNER_BL = true; // true, false
const CORNER_BR = false; // true, false

const HOVER_ANIMATION = true; // true, false

const SYSTEM_TRAY_HOT_CORNER = right; // left, right, middle


// Remeber to change the CORNER_TL, CORNER_TR, CORNER_BL or CORNER_BR to true after you have made a change here.
const TL_COMMAND = false; // 'nautilus.desktop'
const TR_COMMAND = false; // "gnome-terminal.desktop"
const BL_COMMAND = false; // 'firefox.desktop' 
const BR_COMMAND = false; // 'gnome-system-monitor.desktop'

/* NO MORE TO EDIT! ################################################################### */










let corner = [];


function init() { }



function fourLoop ( func ) {
	for (let i = 0, c = 4; i < c; i += 1) {
		func(i);
	}
}



function toggleOverview( node ) {

	if ( HOVER_ANIMATION ) {
		Tweener.addTween(node.ui, {
			opacity: 255,
			time: 0.5,
			transition: 'easeOutQuad',
			onComplete: function () {
				Tweener.addTween( node.ui, {
					opacity: 0,
					time: 0.5,
					transition: 'easeOutQuad'
				} );
			}
		} );
	}

	if ( node.custom_command === false ) {
		Main.overview.toggle();
	} else {
		let app = Shell.AppSystem.get_default().lookup_app( node.custom_command );
		app.open_new_window( -1 );
	}
	
}

function initializeCorners() {
	fourLoop ( function ( i ) {

		corner[i] = {};
		
		corner[i].ui = new St.Bin( {
			style_class: 'corner',
			reactive: true,
			can_focus: true,
			x_fill: true,
			y_fill: false,
			track_hover: true
		} );
		
		Main.uiGroup.add_actor( corner[i].ui );
		
		corner[i].ui.opacity = 0;
	} );
	
	
	corner[0].custom_command = TL_COMMAND;
	corner[1].custom_command = TR_COMMAND;
	corner[2].custom_command = BL_COMMAND;
	corner[3].custom_command = BR_COMMAND;


	let monitor = Main.layoutManager.primaryMonitor;

	corner[0].ui.set_position(-10, -10);
	corner[1].ui.set_position(monitor.width - corner[1].ui.width + 10, - 10);
	corner[2].ui.set_position(0 - 10, monitor.height - corner[2].ui.height + 10);
	corner[3].ui.set_position(monitor.width - corner[3].ui.width + 10, monitor.height - corner[3].ui.height + 10);


	if ( CORNER_TL )
    		corner[0].ui.connect( 'enter-event', function () { toggleOverview( corner[0] ) });
	
	if ( CORNER_TR )
    		corner[1].ui.connect( 'enter-event', function () { toggleOverview( corner[1] ) });

	if ( CORNER_BL )
    		corner[2].ui.connect( 'enter-event', function () { toggleOverview( corner[2] ) });

	if ( CORNER_BR )
    		corner[3].ui.connect( 'enter-event', function () { toggleOverview( corner[3] ) });


}


function enable() {

	temp_hideTray = Main.messageTray._hideTray;

	Main.messageTray._hideTray = Lang.bind( Main.messageTray, function () {
		this._tween( this.actor, '_trayState', MessageTray.State.HIDDEN, { y: -1 } );
	} );

	Main.panel._activitiesButton._hotCorner._corner.hide();

	Main.messageTray._summaryBin.x_align = SYSTEM_TRAY_HOT_CORNER;
	Main.messageTray._hideTray();


	initializeCorners();

}

function disable() {

	Main.messageTray._hideTray = temp_hideTray;

	fourLoop ( function ( i ) {
		Main.uiGroup.remove_actor( corner[i].ui );
	} );


	
	Main.panel._activitiesButton._hotCorner._corner.show();

	Main.messageTray._summaryBin.x_align = right;

}

