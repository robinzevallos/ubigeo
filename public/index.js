class TableComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            source: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ source: nextProps.dataSource });
    }

    render() {
        const items = [];

        for (const [index, value] of this.state.source.entries()) {
            items.push(
                <tr>
                    <td>{value.code}</td>
                    <td>{value.name}</td>
                    <td>{value.codeFather}</td>
                    <td>{value.descriptionFather}</td>
                </tr>
            )
        }

        const mystyle = {
            padding: "0px 40px 0px 0px",
        };

        return <div>
            <h1 class="display-4">{this.props.name}</h1>
            <table class="table table-borderless">
                <thead>
                    <tr class="table-header">
                        <th style={mystyle} scope="col">Código</th>
                        <th style={mystyle} scope="col">Nombre</th>
                        <th style={mystyle} scope="col">Código Padre</th>
                        <th style={mystyle} scope="col">Descripción Padre  </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            regions: [],
            provinces: [],
            districts: [],
        };
    }

    componentDidMount() {
        const dataFilename = 'data.txt';

        fetch(dataFilename)
            .then(response => response.text())
            .then(data => {

                intiDataProcessor(data.split('\n'));

                this.setState({
                    regions: regions,
                    provinces: provinces,
                    districts: districts,
                });

            })
    }

    render() {
        return (
            <div id="main">
                <TableComponent name="Departamento" dataSource={this.state.regions} />
                <TableComponent name="Provincia" dataSource={this.state.provinces} />
                <TableComponent name="Distrito" dataSource={this.state.districts} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));