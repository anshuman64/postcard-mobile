// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer        from '../../components/header/header_container';
import ShareListItem          from '../../components/share_list_item/share_list_item';
import { styles }             from './share_screen_styles';
import { UTILITY_STYLES }     from '../../utilities/style_utility';
import { setStateCallback }   from '../../utilities/function_utility';

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
      <ShareListItem
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
      <ShareListItem setParentState={this.setParentState} isPublic={this.state.isPublic} />
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
          keyExtractor={(item) => item}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          ListHeaderComponent={this._renderHeader()}
          initialListSize={20}
          pageSize={60}
          showsVerticalScrollIndicator={true}
        />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ShareScreen;
