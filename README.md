Hot-Corn-Dog
============

___This repository is deprecated due to changes in the Gnome shell API since 2013___

 


This is a GNOME Shell extension where you can pick your own "hot corners" for toggling the overview, or for running custom applications. You can also change the "hot corner" for the message tray.

INSTALLATION
------------

Download the files:

    git clone https://ricsam@github.com/ricsam/Hot-Corn-Dog.git

If you downloaded the zip you need to:

    unzip Hot-Corn-Dog

then move all the files __in the directory__ to either `~/.local/share/gnome-shell/extensions/Hot-Corn-Dog.euhiemf@github.com` or to if you want to install for all users `/usr/share/gnome-shell/extensions/Hot-Corn-Dog.euhiemf@github.com`

So if you want to install it locally, which is the way I recommend, enter the following in a terminal:

    cd ~
    git clone https://ricsam@github.com/ricsam/Hot-Corn-Dog.git
    cd Hot-Corn-Dog
    mkdir ~/.local/share/gnome-shell/extensions/Hot-Corn-Dog.ricsam@github.com/
    cp * ~/.local/share/gnome-shell/extensions/Hot-Corn-Dog.ricsam@github.com/
    cd ../
    rm -rf Hot-Corn-Dog

Now open the run dialog by pressing `Alt-F2` and write `r`, after that press enter.

By default all corners except the bottom-left are disabled.

After you have installed the extension please read the [compatibility](#compatibility "compatibility") information.

UNINSTALLATION
------------

To uninstall you go to the directory that you installed the extension in, and then remove it. If you for example want to uninstall the extension after a local installaion, enter the following in a terminal:

    rm -rf ~/.local/share/gnome-shell/extensions/Hot-Corn-Dog.euhiemf@github.com/

To just disable the extension go to the *gnome-tweak-tool* and disable it.

CUSTOMIZATION
-------------

Go to the folder where you installed the files and open *extension.js*.

You can edit the following values:

    const CORNER_TL = false;
    const CORNER_TR = false;
    const CORNER_BL = false;
    const CORNER_BR = true;

    const HOVER_ANIMATION = true;

    const SYSTEM_TRAY_HOT_CORNER = right;
                                  
    const TL_COMMAND = false;
    const TR_COMMAND = false;
    const BL_COMMAND = false;
    const BR_COMMAND = false;

The first four values `CORNER_TL`, `CORNER_TR`, `CORNER_BL`, `CORNER_BR` are the four corners. If you want to disable a corner, set the value to `false` otherwise set it to `true`.

Set the `HOVER_ANIMATION` to `true` if you want a blue half circle to come upp for a second when you hover one of the hot corners, otherwise, set it to `false`.

If you want to change the position of the system/message tray you change `SYSTEM_TRAY_HOT_CORNER`, you can choose between having it in the middle, left, or right.

The `TL_COMMAND`, `TR_COMMAND`, `BL_COMMAND`, `BR_COMMAND` values are custom applications that will be executed instead of toggling the *Gnome shell overview*. If you want to launch an installed application, write the name of it followed by `.desktop` in "" (two double quotation marks) or '' (two apostrophes)

When you are done with editing you need to reload the *Gnome shell* by pressing `Alt + F2` and then enter `r`

There are some comments in the *extension.js* file that hopefully will help you with the customization.

COMPATIBILITY
-------------

The extension is by default only compatible with Gnome Shell version 3.4.1, because that is the only version it has been tested on.

To try this extension on your Gnome Shell you need to add your `shell-version` in the *metadata.json* file.

To see which GNOME version you are using, run this is a terminal:

    gnome-shell --version

When you know your version, open the *metadata.json* file by entering this in a terminal:

    gedit ~/.local/share/gnome-shell/extensions/Hot-Corn-Dog.ricsam@github.com/metadata.json

The file should look something like this:

    {
    "shell-version": ["3.4.1"],
    "uuid": "Hot-Corn-Dog.ricsam@github.com",
    "name": "Hot-Corn-Dog",
    "description": "Add Hot-Corners for toggling the overview... bla bla bla"
    }

Now, if your shell version is, for example, __3.5.7__, then add it to the shell-version like this:

    "shell-version": ["3.4.1", "3.5.7"],
    
Now save the file and reload the shell (`Alt + F2` and enter `r`).

If the extension is working fine with your shell version please go to the [issues page](https://github.com/ricsam/Hot-Corn-Dog/issues "issues page") on github and write which GNOME Shell version you are using so that I can add it to the application by default.

If the extension isn't working, please do the same as above (but write that it's not compatible with your version) and I will try to fix the problem.

