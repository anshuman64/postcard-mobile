// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import HeaderContainer           from '../../components/header/header_container';
import CheckboxListItemContainer from '../../components/checkbox_list_item/checkbox_list_item_container';
import SectionListHeader         from '../../components/section_list_header/section_list_header';
import { UTILITY_STYLES }        from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  placeholderText (string): placeholder text of NewPostScreen to send to analytics
Optional Screen Props:
  postText (string): text of the post to be shared, coming from NewPostScreen and/or CreateCircleScreen
  imagePath (string): folder path of image to upload to AWS
  imageType (string): type of image for AWS uploading purposed
*/
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
    this.props.navigateTo('NameCircleScreen');
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
        <SectionListHeader title={section.title} highlightedText={' +'} callback={this._onPressAddCircle} />
      )
    } else {
      return (
        <SectionListHeader title={section.title} />
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
          keyExtractor={(item, index) => String(index)}
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
