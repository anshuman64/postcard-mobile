// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer        from '../../components/nav_bar_header/header_container.js';
import ShareListItemContainer from '../../components/share_list_item/share_list_item_container.js';
import { styles }             from './share_screen_styles.js';
import { UTILITY_STYLES }     from '../../utilities/style_utility.js';
import { setStateCallback }   from '../../utilities/function_utility.js';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

class ShareScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isPublic:   false,
      recipients: [],
    };
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to ShareListItem for updating state
  setParentState = (state) => {
    this.setState(state);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderItem = ({item}) => {
    return (
      <ShareListItemContainer
        userId={item}
        recipients={this.state.recipients}
        setParentState={this.setParentState}
        />
    )
  }

  _renderSectionHeader = ({section}) => {
    return (
      <RN.View style={styles.sectionHeader}>
        <RN.Text style={styles.sectionHeaderText}>
          {section.title}
        </RN.Text>
      </RN.View>
    )
  }

  _renderHeader = () => {
    return (
      <ShareListItemContainer setParentState={this.setParentState} isPublic={this.state.isPublic} />
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer
          backIcon={true}
          backTitle={'Select Friends'}
          shareButton={true}
          postText={this.props.postText}
          placeholderText={this.props.placeholderText}
          imagePath={this.props.imagePath}
          imageType={this.props.imageType}
          recipients={this.state.recipients}
          isPublic={this.state.isPublic}
          />
        <RN.SectionList
          sections={[{data: this.props.friendships.accepted, renderItem: this._renderItem.bind(this), title: 'Friends'}]}
          keyExtractor={(item) => item.id}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          ListHeaderComponent={this._renderHeader()}
          initialListSize={20}
          pageSize={80}
          showsVerticalScrollIndicator={true}
          onEndReachedThreshold={10000}
          scrollRenderAheadDistance={10000}
        />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ShareScreen;
