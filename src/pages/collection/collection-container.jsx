import {connect} from 'react-redux';
import {compose} from 'redux';
import WithSpinner from '../../components/with-spinner/with-spinner-component';
import CollectionPage from './collection-component';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop-selector';

const mapStateToProps = (state) => ({
    isLoading: !selectIsCollectionsLoaded(state)
})

const CollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionContainer;