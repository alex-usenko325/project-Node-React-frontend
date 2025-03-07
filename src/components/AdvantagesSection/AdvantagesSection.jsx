import s from './AdvantagesSection.module.css';
import customer1 from '../../assets/img/customers/customer1.png';
import customer2 from '../../assets/img/customers/customer2.png';
import customer3 from '../../assets/img/customers/customer3.png';

const AdvantagesSection = () => {
  const customers = [customer1, customer2, customer3];

  return (
    <div className={s.wrapper}>
      <div className={s.customers}>
        <div className={s.img}>
          {customers.map((img, index) => (
            <img src={img} alt="user" key={index} className={s.avatar} />
          ))}
        </div>

        <p className={s.text}>
          Our <span>happy</span> customer
        </p>
      </div>
      <ul className={s.benefits}>
        <li className={s.benefitHabit}>Habit drive</li>
        <li className={s.benefitStatistics}>View statistics</li>
        <li className={s.benefitSetting}>Personal rate setting</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
