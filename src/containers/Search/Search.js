import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import coordinates from 'capitals-coordinates';
import Icon from '../../components/Icon/Icon';

const countriesArray = coordinates.rawData;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  getCoords = (city) => {      
    const index = countriesArray.findIndex((country) => 
      country
        .properties.capital.toLowerCase() === city.toLowerCase());
    if (index > -1) {      
      return countriesArray[index];
    }

    return false;
  }

  onKeyDown = (event) => {
    const { value } = this.state;
    const { select } = this.props;
    if(value){
      if(event.key === "SoftLeft"){
        select(value, this.getCoords(value))
        this.setState({
          value: '',
          suggestions: []
        });
        this.props.typing('');
      } else if (event.key === "SoftRight"){       
        this.setState({
          value: '',
          suggestions: []
        });
        this.props.typing('');
      }
    }
  };

  onChange = (event, { newValue, method }) => {
    this.props.typing(newValue);
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  checkCity = (city) => {
    const filtred = countriesArray.filter((country) => country.properties.capital.toLowerCase()
      .indexOf(city.toLowerCase()) === 0      
    );
    return filtred.map((country) => country.properties.capital);
  }

  getSuggestions = (value) => {
    return this.checkCity(value);
  }

  getSuggestionValue = (suggestion) => suggestion;

  render() {
    const { value, suggestions } = this.state;
    const { children, city } = this.props;
    const renderSuggestion = (suggestion) => (
      <span>
        {suggestion}
      </span>
    );

    return (
      <Wrapper>
        <StyleWrapper>
          <Autosuggest
            suggestions={suggestions.slice(0, 12)}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderInputComponent={function(props) {
              return (
                <SearchWrapper>
                  <InputWrapper>
                    <IconWrapper>
                      <Icon type="search"/>
                    </IconWrapper>
                    <Input
                      {...props}
                      autoFocus
                    />
                  </InputWrapper>
                </SearchWrapper>)
            }}
            inputProps={
              {
                placeholder: city ?  city : 'Search places',
                value,
                onChange: this.onChange,
                onKeyDown: this.onKeyDown
              }
            }
          />
        </StyleWrapper>
        { children }
      </Wrapper>
    );
  }
}

export default Search;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


const StyleWrapper = styled.div`
  & .react-autosuggest__suggestions-container--open {
    margin:0;
    padding: 0;
    list-style: none;
    width: 240px;
    height: 230px;
    background-color: #ffffff;
    position: absolute;
    z-index: 999;
  }

  & .react-autosuggest__suggestions-list {
    color: #797e83;
    font-size: 14px;
    list-style-type: none;
    padding: 9px 0 0 9px;
    margin: 0;
  }

  & .react-autosuggest__suggestion--highlighted {
    color: #5185ba;
    font-weight: bold;
  }
`;

const SearchWrapper = styled.div`
  display:flex;
  height: 41px;
  background-color: #5185ba;
  flex-direction:row;
  box-sizing: border-box;
  align-items: middle;
  padding: 9px 9.5px 0 9px;
`;

const InputWrapper = styled.div`
  display:flex;
  box-sizing: border-box;
  align-items: middle;
  width: 100%;
  height: 24px;
  background-color: #ffffff;
`;

const IconWrapper = styled.div`
  padding: 3px;
  height: 24px;
`;

const Input = styled.input`
  background-color: white;
  height: 24px;
  line-height: 24px;
  border: 1px transparent;
  border-radius: 1px;
  background-color: #ffffff;
  vertical-align: middle;
  width: 100%;
  outline: none;
  overflow: auto;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  color: transparent;
  text-shadow: 0 0 0 #5185ba;
  &::placeholder {
    color: #5185ba;
  }
`;

