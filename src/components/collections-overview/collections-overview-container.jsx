import {compose} from 'redux';
import {connect} from 'react-redux';
import CollectionsOverview from './collections-overview-component';
import WithSpinner from '../with-spinner/with-spinner-component';
import { selectIsCollectionsFetching } from '../../redux/shop/shop-selector';

const mapStateToProps = (state) => ({
    isLoading: selectIsCollectionsFetching(state)
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;