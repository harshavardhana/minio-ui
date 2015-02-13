var React = require("react");
var Mui = require("material-ui");

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var Icon = Mui.Icon;
var Menu = Mui.Menu;
var RaisedButton = Mui.RaisedButton;
var TextField = Mui.TextField;

var HiddenMenu = React.createClass({
    render: function() {
        if(this.props.menuItems.length > 0) {
            return (
                <Menu menuItems={this.props.menuItems} />
            )
        } else {
            return false;
        }
    }
})

var AddBucket = React.createClass({
    getInitialState: function() {
        return {
            buckets: []
        }
    },
    render: function() {
        return(
            <div>
                <HiddenMenu menuItems={this.state.buckets} />
                <form onSubmit={this.handleSubmit}>
                    <br />
                    <TextField hintText="Bucket Name" ref ="bucketName" />
                    <br />
                    <RaisedButton label="Add Bucket" />
                </form>
            </div>
        );
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var bucketName = this.refs.bucketName.getValue().trim();
        var menuItem = {
            payload: this.state.buckets.length + 1,
            text: bucketName
        }
        var newState = React.addons.update(this.state, {
            buckets: {
                $push : [menuItem]
            }
        });
        this.setState(newState);
        this.refs.bucketName.setValue('');
    }
});

var MinioMenu = React.createClass({
    render: function() {
        if(this.props.visible) {
            return (
                <div>
                    <Icon icon="navigation-menu" className="minio-menu-button" onClick={this.props.openMenuFunction} />
                    <Menu className="minio-menu-menu" menuItems={this.props.menuItems} />
                    <div className="minio-menu-underlay" ref="minioMenuUnderlay" onClick={this.props.closeMenuFunction} />
                </div>
            )
        } else {
            return (
                <div>
                    <Icon icon="navigation-menu" className="minio-menu-button" onClick={this.props.openMenuFunction} />
                </div>
            )
        }
    }
})

var MinioApp = React.createClass({
    getInitialState: function() {
        return {
            menuVisible: false,
            menuItems: [
                {payload: 1, text: 'Add Bucket'}
            ]
        };
    },
    render: function() {
        return(
            <div>
                <MinioMenu menuItems={this.state.menuItems} visible={this.state.menuVisible} closeMenuFunction={this.navCloseMenu} openMenuFunction={this.navOpenMenu}/>
                <AddBucket />
            </div>
        )
    },
    navCloseMenu: function() {
        this.setState({
            menuVisible: false
        })
    },
    navOpenMenu: function() {
        this.setState({
            menuVisible: true
        })
    }
});


var menuItems = [
    { route: 'status', text: 'Status'},
    { route: 'add-bucket', text: 'Add Bucket'},
]

document.addEventListener(
    "DOMContentLoaded",
    function(event) {
        React.render(
            <MinioApp />,
            document.body
        );
    }
)

