export default function Home() {
  return (
      <div>
          <div id="text">Bonjour, appuie sur le bouton pour changer ma couleur !</div>
          <button id="changeColorBtn">Changer la couleur</button>
          <style jsx>{`
              #text {
                  font-size: 24px;
                  color: black;
              }
              #changeColorBtn {
                  padding: 10px 20px;
                  font-size: 16px;
                  cursor: pointer;
                  background-color: #4CAF50;
                  color: white;
                  border: none;
                  border-radius: 5px;
              }
              #changeColorBtn:hover {
                  background-color: #45a049;
              }
          `}</style>
          <script>
              {`
              document.getElementById('changeColorBtn').addEventListener('click', function () {
                  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                  document.getElementById('text').style.color = randomColor;
              });
              `}
          </script>
      </div>
  );
}
