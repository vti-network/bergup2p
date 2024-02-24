Create a .env file in the project root folder.
Add GENERATE_SOURCEMAP=FALSE in the created env file.

2. Melalui package.json Edit skrip build
package.json Anda seperti di bawah ini:


Anda harus memodifikasi skrip build di package.json Anda dengan menambahkan generate source map ke false.
#windows
build: set \"GENERATE_SOURCEMAP=false\" && react-scripts build
#linux
build: GENERATE_SOURCEMAP=false react-scripts build

