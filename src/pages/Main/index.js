import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PodcastsActions from '~/store/ducks/podcasts';

import {
  Container,
  PodcastList,
  Podcast,
  Cover,
  Info,
  Title,
  Count,
  PageTitle,
} from './styles';

class Main extends Component {
  componentDidMount() {
    const {loadRequest} = this.props;

    loadRequest();
  }

  handlePodcastPress = (podcast) => {
    const {navigation} = this.props;

    navigation.navigate('Podcast', {podcast});
  };

  render() {
    let {podcasts} = this.props;
    return (
      <Container>
        <PodcastList
          ListHeaderComponent={() => <PageTitle>Podcasts</PageTitle>}
          data={podcasts.data.podcasts}
          keyExtractor={(podcast) => podcast.id.toString()}
          renderItem={({item: podcast}) => (
            <Podcast onPress={() => this.handlePodcastPress(podcast)}>
              <Cover source={{uri: podcast.cover}} />
              <Info>
                <Title>{podcast.title}</Title>
                <Count>{`${podcast.tracks.length} episódios`}</Count>
              </Info>
            </Podcast>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({podcasts: state.podcasts});
const mapDispatchTopProps = (dispatch) =>
  bindActionCreators(PodcastsActions, dispatch);

export default connect(mapStateToProps, mapDispatchTopProps)(Main);
