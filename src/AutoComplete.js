import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'underscore';



// Use your imagination to render suggestions.
const renderInputComponent = inputProps => (  
    <input class="form-control editor edit-text" {...inputProps} />      
);
const renderSuggestion = suggestion => (  
    <span>{suggestion.name}</span>
);

class AutoComplete extends React.Component {
    constructor(props) {        
        super(props);        
        this.updateData = this.updateData.bind(this);
        this.state = {            
            suggestions:props.suggestions,
            value:''
        };        
    }
    focus() { }
    updateData() {        
        this.props.onUpdate(this.state.value);
    }  
    search(value){                            
        return _.uniq([...this.props.suggestions].filter(function(item){ return item.name.toLowerCase().indexOf(value.toLowerCase())>=0;}),true,"name");        
    }
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };
        onBlur = (event, { focusedSuggestion }) => {                        
            this.updateData();
        };

        // Autosuggest will call this function every time you need to update suggestions.
        // You already implemented this logic above, so just use it.
        onSuggestionsFetchRequested = ({ value }) => {
            this.setState({
                suggestions: this.search(value)
            });
        };

        // Autosuggest will call this function every time you need to clear suggestions.
        onSuggestionsClearRequested = () => {};

        // When suggestion is clicked, Autosuggest needs to populate the input element
        // based on the clicked suggestion. Teach Autosuggest how to calculate the
        // input value for every given suggestion.
        getSuggestionValue = suggestion => suggestion.name;

        render() {
            const { value, suggestions } = this.state;            
            // Autosuggest will pass through all these props to the input element.
            const inputProps = {
                placeholder: 'Begin typing to select an item.',
                value,
                onChange: this.onChange,
                onBlur:this.onBlur
            };            
            if (this.props.className) {
                inputProps.className=this.props.className;
            }

            // Finally, render it!
            return (
                
              <Autosuggest
                suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        //renderSuggestionsContainer = {renderSuggestionsContainer}
        //renderInputComponent={renderInputComponent}
        inputProps={inputProps}
    />            
);
    }
}

export default AutoComplete;