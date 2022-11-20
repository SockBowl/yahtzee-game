import './styles/RuleRow.css';

function RuleRow(props) {
  const { doScore, name, score, description } = props;
  return (
    <tr
      className={`RuleRow RuleRow-${score ? 'disabled' : 'active'}`}
      onClick={!score ? doScore : null}
    >
      <td className='RuleRow-name'>{name}</td>
      <td className='RuleRow-score'>{score ? score : description}</td>
    </tr>
  );
}

export default RuleRow;
