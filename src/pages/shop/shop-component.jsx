import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CollectionContainer from '../collection/collection-container';
import {connect} from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop-action';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview-container';

//const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component{

    // state = {
    //     loading: true
    // };

    // unsubscribeFromSnapshopt = null;

    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
        // const {updateCollections} = this.props;
        // const collectionRef = firestore.collection('collections');

        // collectionRef.get().then((snapshot) =>{
        //     console.log("snapshot: ", snapshot);
        //     const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        //     console.log("collectionsMap: ", collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // });
        // this.unsubscribeFromSnapshopt = collectionRef.onSnapshot(async (snapshot) => {
        //     console.log("snapshot: ", snapshot);
        //     const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        //     console.log("collectionsMap: ", collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // });

        // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-e92a3/databases/(default)/documents/collections")
        // .then(response => response.json())
        // .then(collections => console.log("response: ", collections))
    }

    render(){
        const {match} = this.props;
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer } />
                <Route exact path={`${match.path}/:collectionId`} component={CollectionContainer} />
            </div>
        );
        // return(
        //     <div className="shop-page">
        //         <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionsFetching} {...props} /> } />
        //         <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} /> } />
        //     </div>
        // );
        //const {loading} = this.state;
        // return(
        //     <div className="shop-page">
        //         <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> } />
        //         <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
        //     </div>
        // );
    }
};

// const mapStateToProps = (state) => ({
//     isCollectionsFetching: selectIsCollectionsFetching(state),
//     isCollectionsLoaded: selectIsCollectionsLoaded(state)
// });

const mapDispatchToProps = (dispatch) => ({
    // updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)) 
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);