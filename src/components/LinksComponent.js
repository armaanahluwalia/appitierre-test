import React from 'react';
import { CSSTransition } from 'react-transition-group';

/** 
 * Component that renders the links 
 * @prop links - An array of link objects with an id and href
**/
class LinksComponent extends React.Component {
    constructor(props) {
        super(props);
        // Generates a random color for each item
        this.colors = props.links.map(() => {
            return 'rgb(' + (Math.floor(Math.random() * 256)) 
            + ',' + (Math.floor(Math.random() * 256)) 
            + ',' + (Math.floor(Math.random() * 256)) + ')';
        });
    }
    render() {
      const linkElements = this.props.links
        .map((link, ind) => {
            const color = this.colors[ind];
            return (<CSSTransition
                in={Boolean(link.href.length)}
                key={link.id} 
                timeout={300}
                classNames="display-link" 
                appear={true}
            >
                {(status) => (
                    <a 
                        href={link.href} 
                        className={`display-link ${status}`}
                    >
                    <span 
                        className="link-bg"
                        style={{ background: color }}
                    ></span>
                    <span 
                        className="accent"
                        style={{ background: color }}
                    ></span>
                    <span
                        className={"link-text"}
                    >Link {link.id}</span>
                    </a>
                )}
            </CSSTransition>);
        });
      return (
        <div className="links-container">
          {linkElements}
        </div>
      )
    }
  };

  export default LinksComponent;