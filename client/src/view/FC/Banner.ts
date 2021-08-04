import FC, { html } from './FC';

const Banner: FC = () => {
  return html`
    <section
      class="h-6 w-full text-md text-center text-green-400 dark:text-purple-400"
    >
      운영체제 다크모드에 맞춰서 테마가 변해요!
    </section>
  `;
};

export default Banner;
