import React, {Component} from 'react';
import './directory-style.scss';
import MenuItem from '../menu-item/menu-item-component';
import {connect} from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/directory-selector';

class Directory extends Component{

    render(){
      const {sections} = this.props;
        return(
            <div className="directory-menu">
            {
                sections.map(({id, ...otherSectionProps}) => {
                    return (
                        <MenuItem key={id} {...otherSectionProps} />
                    );
                })
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  sections: selectDirectorySections(state)
})

export default connect(mapStateToProps)(Directory);