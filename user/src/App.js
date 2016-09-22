import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

var Expense = React.createClass({
    handleDateChange: function(e) {
        // this.setState({date: e.target.value});
        this.handleExpenseEdit({text: this.props.text, date: e.target.value, time: this.props.time, cost: this.props.cost, id: this.props.id});
        // this.editExpense({text: this.props.text, date: e.target.value, time: this.props.time, cost: this.props.cost, id: this.props.id});
    },
    handleTimeChange: function(e) {
        this.handleExpenseEdit({text: this.props.text, date: this.props.date, time: e.target.value, cost: this.props.cost, id: this.props.id});
        // this.setState({time: e.target.value});
        // this.editExpense({text: this.props.text, date: this.props.date, time: e.target.value, cost: this.props.cost, id: this.props.id});
    },
    handleTextChange: function(e) {
        this.handleExpenseEdit({text: e.target.value, date: this.props.date, time: this.props.time, cost: this.props.cost, id: this.props.id});
        // this.editExpense({text: e.target.value, date: this.props.date, time: this.props.time, cost: this.props.cost, id: this.props.id});
    },
    handleCostChange: function(e) {
        // console.log(e.target.value)
        // this.state.cost = e.target.value;
        // this.setState(this.state);
        this.handleExpenseEdit({text: this.props.text, date: this.props.date, time: this.props.time, cost: e.target.value, id: this.props.id});
        // this.setState({cost: e.target.value});
        // console.log(this.state);
        // this.editExpense({text: this.props.text, date: this.props.date, time: this.props.time, cost: e.target.value, id: this.props.id});
    },
    handleExpenseEdit: function(expense)
    {
        this.props.onEdit(expense);
        return false;
    },
    handleExpenseRemove: function() {
          this.props.onDelete({id: this.props.id, date: this.props.date, time: this.props.time, text: this.props.children, cost: this.props.cost});
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
        if (this.props.data.length === 1)
        {
            this.props.data = [ this.props.data ];
        }
        var expenseNodes = this.props.data.map(function(expense) {
            return (
            <Expense date={expense.date} time={expense.time} cost={expense.cost} id={expense.id} key={expense.id} onDelete={that.handleExpenseRemove} onEdit={that.handleExpenseEdit}>
              {expense.text}
            </Expense>
          )
        });
        return (
          <div className="expensesList">
              <br/>
              <table className="table table-striped">
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
          <form className="form-inline" >
              <br/>
              <input type="date"
                     className="form-control"
                   placeholder="DateFrom"
                   value={this.state.datefrom}
                   onChange={this.handleDateFromChange}/>
              <br/>
              <input type="date"
                     className="form-control"
                   placeholder="DateTo"
                   value={this.state.dateto}
                   onChange={this.handleDateToChange}/>
              <br/>
              <input type="time"
                     className="form-control"
                   placeholder="TimeFrom"
                   value={this.state.timefrom}
                   onChange={this.handleTimeFromChange}/>
              <br/>
              <input type="time"
                     className="form-control"
                   placeholder="TimeTo"
                   value={this.state.timeto}
                   onChange={this.handleTimeToChange}/>
              <br/>
              <input type="text"
                     className="form-control"
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
          <form className="form-inline" onSubmit={this.handleSubmit} >
              <br/>
              <input type="date"
                     className="form-control"
                   placeholder="Date"
                   value={this.state.date}
                   onChange={this.handleDateChange}/>
              <br/>
              <input type="time"
                     className="form-control"
                   placeholder="Time"
                   value={this.state.time}
                   onChange={this.handleTimeChange}/>
              <br/>
              <input type="text"
                     className="form-control"
                   placeholder="Say something..."
                   value={this.state.text}
                   onChange={this.handleTextChange}/>
              <br/>
              <input type="number"
                     className="form-control"
                   placeholder="Cost"
                   value={this.state.cost}
                   onChange={this.handleCostChange}/>
              <br/>
              <input type="submit" value="Save" />
          </form>
    );
  }
});

var ExpensesLimit = React.createClass({
    getInitialState: function() {
        return {limit: ''};
    },
    handleLimitChange: function(e)
    {
        this.setState({limit: e.target.value});
    },
    render: function()
    {
        return (
            <div className={this.props.onLimit({limit: this.state.limit})}>
            Limit
            <br/>
            <input type="number" placeholder="Limit" value={ this.state.limit } onChange={this.handleLimitChange} />
            </div>
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
    handleLimit: function(limit) {
        var date = new Date(Date.now());
        var sum = 0;
        var elength = this.state.data.length;
        for (var i = 0; i < elength; i++)
        {
            var old_date = new Date(this.state.data[i].date);
            if (old_date.toLocaleDateString() === date.toLocaleDateString())
            {
                sum += this.state.data[i].cost;
            }
        }
        var limit = limit.limit;
        if (!limit) {
            return 'empty';
        }
        else if (sum <= limit)
        {
            return 'isLess';
        }
        return 'isGreater';
    },
    handleExpensesFilter: function(filter) {
        var new_data = this.state.data;
        var data = [];
        var elength = this.state.data.length;
        for(var i = 0; i < elength; i++) {
            if (new_data[i].date >= filter.datefrom && new_data[i].date <= filter.dateto &&
                new_data[i].time >= filter.timefrom && new_data[i].time <= filter.timeto &&
                new_data[i].text.search(filter.text) !== -1)
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
      <div className="container">
           <div className="container">
               <h1>Expenses</h1>
           </div>
          <div className="container">
              <ExpensesList data={ this.state.data } onExpenseDelete={this.handleExpenseRemove} onExpenseEdit={this.handleExpenseEdit}/>
              <div className="row">
                  <div className="col-sm-4">
              <ExpensesForm onExpenseSubmit={this.handleExpenseSubmit} />
                      </div>
                  <div className="col-sm-4">
              <ExpensesFilterForm onExpensesFilter={this.handleExpensesFilter} />
                      </div>
                  <div className="col-sm-4">
              <ExpensesLimit onLimit={ this.handleLimit } />
                      </div>
                  </div>
          </div>
      </div>
    );
  }
});


export default ExpensesBox;
