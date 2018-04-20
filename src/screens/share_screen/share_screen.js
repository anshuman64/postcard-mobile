// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer        from '../../components/header/header_container';
import CheckboxListItemContainer  from '../../components/checkbox_list_item/checkbox_list_item_container';
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
      circles:    [],
      recipients: [],
    };
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to CheckboxListItem for updating state
  setParentState = (state) => {
    this.setState(state);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddCircle = () => {
    this.props.navigateTo('NameCircleScreen', {
      postText: this.props.postText,
      placeholderText: this.props.placeholderText,
      imagePath: this.props.imagePath,
      imageType: this.props.imageType,
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderUserItem = ({item}) => {
    return (
      <CheckboxListItemContainer
        convoId={item}
        recipients={this.state.recipients}
        setParentState={this.setParentState}
        />
    )
  }

  _renderCircleItem = ({item}) => {
    return (
      <CheckboxListItemContainer
        circle={item}
        recipients={this.state.recipients}
        circles={this.state.circles}
        setParentState={this.setParentState}
        />
    )
  }

  _renderSectionHeader = ({section}) => {
    if (section.title === 'Circles') {
      return (
        <RN.TouchableOpacity onPress={this._onPressAddCircle} style={UTILITY_STYLES.sectionHeader}>
          <RN.Text style={UTILITY_STYLES.sectionHeaderText}>
            {section.title}
          </RN.Text>
          <RN.Text style={UTILITY_STYLES.regularBlackText18, UTILITY_STYLES.textHighlighted}>
            {' +'}
          </RN.Text>
        </RN.TouchableOpacity>
      )
    } else {
      return (
        <RN.View style={UTILITY_STYLES.sectionHeader}>
          <RN.Text style={UTILITY_STYLES.sectionHeaderText}>
            {section.title}
          </RN.Text>
        </RN.View>
      )
    }
  }

  _renderHeader = () => {
    return (
      <CheckboxListItemContainer setParentState={this.setParentState} isPublic={this.state.isPublic} />
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
          sections={[
            {data: this.props.circles, renderItem: this._renderCircleItem.bind(this), title: 'Circles'},
            {data: this.props.conversations, renderItem: this._renderUserItem.bind(this), title: 'Friends'}
          ]}
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
