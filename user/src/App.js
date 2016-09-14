import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

var Expense = React.createClass({
    editExpense: function(expense) {
        this.props.onEdit(expense);
        return false;
    },
    handleDateChange: function(e) {
        this.setState({date: e.target.value});
        this.editExpense({text: this.props.text, date: e.target.value, time: this.props.time, cost: this.props.cost, id: this.props.id});
    },
    handleTimeChange: function(e) {
        this.setState({time: e.target.value});
        this.editExpense({text: this.props.text, date: this.props.date, time: e.target.value, cost: this.props.cost, id: this.props.id});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
        this.editExpense({text: e.target.value, date: this.props.date, time: this.props.time, cost: this.props.cost, id: this.props.id});
    },
    handleCostChange: function(e) {
        this.setState({cost: e.target.value});
        this.editExpense({text: this.props.text, date: this.props.date, time: this.props.time, cost: e.target.value, id: this.props.id});
    },
    handleExpenseRemove: function() {
          this.props.onDelete({id: this.props.id, date: this.props.date, time: this.props.time, text: this.props.text, cost: this.props.cost});
          return false;
        },
    render: function() {
    return (
         <tr>
             <td><input type="date" value={this.props.date} onChange={this.handleDateChange}/></td>
             <td><input type="time" value={this.props.time} onChange={this.handleTimeChange}/></td>
             <td><input type="text" value={this.props.children} onChange={this.handleTextChange}/></td>
             <td><input type="number" value={this.props.cost} onChange={this.handleCostChange}/></td>
             <td><input type="button" value="Remove" onClick={this.handleExpenseRemove}/></td>
        </tr>
    );
  }
});

var ExpensesList = React.createClass({
    handleExpenseRemove: function(e) {
        this.props.onExpenseDelete(e);
    },
    handleExpenseEdit: function(e) {
        this.props.onExpenseEdit(e);
    },
    render: function() {
        var that = this;
        console.log(this.props.data);
        if (this.props.data.length === 1)
        {
            this.props.data = [ this.props.data ];
        }
        var expenseNodes = this.props.data.map(function(expense) {
            return (
            <Expense date={expense.date} time={expense.time} cost={expense.cost} id={expense.id} onDelete={that.handleExpenseRemove} onEdit={that.handleExpenseEdit}>
              {expense.text}
            </Expense>
          )
        });
        return (
          <div className="expensesList">
              <br/>
              <table>
                  <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Text</th>
                        <th>Cost</th>
                        <th></th>
                    </tr>
                    </thead>
                  <tbody>
                  {expenseNodes}
                  </tbody>
              </table>
          </div>
        );
      }
});

var ExpensesFilterForm = React.createClass({
    getInitialState: function() {
        return {datefrom: '', dateto: '', timefrom: '', timeto: '', text: ''};
    },
    handleDateFromChange: function(e) {
        this.setState({datefrom: e.target.value});
    },
    handleDateToChange: function(e) {
        this.setState({dateto: e.target.value});
    },
    handleTimeFromChange: function(e) {
        this.setState({timefrom: e.target.value});
    },
    handleTimeToChange: function(e) {
        this.setState({timeto: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleFilter: function(e){
        var text = this.state.text;
        var datefrom = this.state.datefrom;
        var dateto = this.state.dateto;
        var timefrom = this.state.timefrom;
        var timeto = this.state.timeto;
        if (!text || !datefrom || !dateto || !timefrom || !timeto) {
          return;
        }
        this.props.onExpensesFilter({datefrom: datefrom, dateto: dateto, timefrom: timefrom, timeto: timeto, text: text});
        this.setState({datefrom: '', dateto: '', timefrom: '', timeto: '', text: ''});
    },
    render: function() {
        return (
          <form className="expensesFilterForm" >
              <br/>
              <input type="date"
                   placeholder="DateFrom"
                   value={this.state.datefrom}
                   onChange={this.handleDateFromChange}/>
              <br/>
              <input type="date"
                   placeholder="DateTo"
                   value={this.state.dateto}
                   onChange={this.handleDateToChange}/>
              <br/>
              <input type="time"
                   placeholder="TimeFrom"
                   value={this.state.timefrom}
                   onChange={this.handleTimeFromChange}/>
              <br/>
              <input type="time"
                   placeholder="TimeTo"
                   value={this.state.timeto}
                   onChange={this.handleTimeToChange}/>
              <br/>
              <input type="text"
                   placeholder="Your text"
                   value={this.state.text}
                   onChange={this.handleTextChange}/>
              <br/>
              <input type="button" value="Filter" onClick={this.handleFilter}/>
          </form>
    );
  }
});

var ExpensesForm = React.createClass({
    getInitialState: function() {
        return {date: '', time: '', text: '', cost: ''};
    },
    handleDateChange: function(e) {
        this.setState({date: e.target.value});
    },
    handleTimeChange: function(e) {
        this.setState({time: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleCostChange: function(e) {
        this.setState({cost: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.state.text.trim();
        var date = this.state.date;
        var time = this.state.time;
        var cost = this.state.cost;
        if (!text || !date || !time || !cost) {
          return;
        }
        this.props.onExpenseSubmit({date: date, time: time, text: text, cost: cost});
        this.setState({date: '', time: '', text: '', cost: ''});
    },
    render: function() {
        return (
          <form className="expensesForm" onSubmit={this.handleSubmit} >
              <br/>
              <input type="date"
                   placeholder="Date"
                   value={this.state.date}
                   onChange={this.handleDateChange}/>
              <br/>
              <input type="time"
                   placeholder="Time"
                   value={this.state.time}
                   onChange={this.handleTimeChange}/>
              <br/>
              <input type="text"
                   placeholder="Say something..."
                   value={this.state.text}
                   onChange={this.handleTextChange}/>
              <br/>
              <input type="number"
                   placeholder="Cost"
                   value={this.state.cost}
                   onChange={this.handleCostChange}/>
              <br/>
              <input type="submit" value="Save" />
          </form>
    );
  }
});

var ExpensesBox = React.createClass({
    loadExpensesFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.log(xhr);
          }
        });
      },
    handleExpensesFilter: function(filter) {
        var new_data = this.state.data;
        var index = -1;
        var data = [];
        console.log('new data');
        console.log(new_data);
        var elength = this.state.data.length;
        for(var i = 0; i < elength; i++) {
            console.log(new_data[i]);
            if (new_data[i].date >= filter.datefrom && new_data[i].date <= filter.dateto && new_data[i].time >= filter.timefrom && new_data[i].time <= filter.timeto && new_data[i].text.search(filter.text) !== -1)
            {
                data.push(new_data[i]);
            }
        }
        this.setState({data: data});
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
              console.log(data);
          },
          error: function(xhr, status, err) {
              console.log(xhr);
          }
        });
    },
    handleExpenseEdit: function(expense) {
        var that = this;
        $.ajax({
            url: this.props.url+expense.id+'/',
            dataType: 'json',
            type: 'PATCH',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRFToken', readCookie('csrftoken'));
            },
            data: expense,
            success: function(data) {
                console.log(data);
                var new_data = that.state.data;
                var elength = that.state.data.length;
                for(var i = 0; i < elength; i++) {
                    if (that.state.data[i].id === data.id) {
                        new_data[i].text = data.text;
                        new_data[i].time = data.time;
                        new_data[i].date = data.date;
                        new_data[i].cost = data.cost;
                        break;
                    }
                }
                that.setState({data: new_data});
            },
            error: function(xhr, status, err) {
              console.log(xhr);
          }
        });
    },
    handleExpenseSubmit: function(expense) {
        var expenses = this.state.data;
        var that = this;
        // this.setState({data: expenses.concat(expense)});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRFToken', readCookie('csrftoken'));
            },
            data: expense,
            success: function(data) {
                that.setState({data: expenses.concat(data)});
            },
            error: function(xhr, status, err) {
              console.log(xhr);
          }
        });
      },
    handleExpenseRemove: function(expense) {
          var index = -1;
          var elength = this.state.data.length;
          for(var i = 0; i < elength; i++) {
              if(this.state.data[i].id === expense.id) {
                  index = i;
                  break;
              }
          }
          var data = this.state.data[index];
          var that = this;

          $.ajax({
            url: this.props.url+expense.id+'/',
            dataType: 'json',
              beforeSend: function(xhr) {
                  xhr.setRequestHeader('X-CSRFToken', readCookie('csrftoken'));
                },
            type: 'DELETE',
            data: data,
            success: function(data) {
                that.state.data.splice(index, 1);
                that.setState({data: that.state.data});
            },
            error: function(xhr, status, err) {
                console.log(xhr);
          }
        });
    },
    getInitialState: function() {
        return {data: []};
      },
    componentDidMount: function() {
        this.loadExpensesFromServer();
      },
    render: function() {
    return (
      <div className="App">
           <div className="App-header">
               <h1>Expenses</h1>
           </div>
          <div className="App-intro">
              <ExpensesList data={ this.state.data } onExpenseDelete={this.handleExpenseRemove} onExpenseEdit={this.handleExpenseEdit}/>
              <ExpensesForm onExpenseSubmit={this.handleExpenseSubmit} />
              <ExpensesFilterForm onExpensesFilter={this.handleExpensesFilter} />
          </div>
      </div>
    );
  }
});


export default ExpensesBox;
