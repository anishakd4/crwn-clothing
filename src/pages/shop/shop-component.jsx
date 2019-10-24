import React, {Component} from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview-component';
import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection-component';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase-util';
import {connect} from 'react-redux';
import { updateCollections } from '../../redux/shop/shop-action';
import WithSpinner from '../../components/with-spinner/with-spinner-component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component{

    state = {
        loading: true
    };

    unsubscribeFromSnapshopt = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then((snapshot) =>{
            console.log("snapshot: ", snapshot);
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            console.log("collectionsMap: ", collectionsMap);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
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
        const {loading} = this.state;
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> } />
                <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)) 
});

export default connect(null, mapDispatchToProps)(ShopPage);