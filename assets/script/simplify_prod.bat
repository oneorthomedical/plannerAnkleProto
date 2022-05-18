@echo OFF
@title MultiMesh Scripting
cls

echo.
echo MultiMesh Scripting - Run a MLX Script on a Folder v1.0
echo June 18, 2014 - 2.54pm
echo Script by Houssam KARRACH ONEORTHO
echo ----------------------------------------------------------------
echo This bat script will process a series of meshes from the
echo input folder, run them through a meshlabserver script
echo and save the resulting meshes to the output folder
echo ----------------------------------------------------------------
echo.

rem Switch to the MultiMesh program's working directory
C:
cd C:\inetpub\wwwroot\gestion_in2bones\web\

rem Input Mesh File variables
@set inputFolder=%1

@set inputMeshFormat=stl

@set outputFolder=%2
@set outputMeshFormat=obj
@set talusma=talus.STL
@set tibiama=tibia.STL
@set peronema=perone.STL
@set talusmin=talus.stl
@set tibiamin=tibia.stl
@set peronemin=perone.stl

rem Note: If you use the PLY output format it is saved as a BINARY PLY file

@set mlxScriptFile= C:\inetpub\wwwroot\gestion_in2bones\web\3din2_gestion\assets\script\quadric.mlx
@set mlxScriptFileClean= C:\inetpub\wwwroot\gestion_in2bones\web\3din2_gestion\assets\script\quadricNoS.mlx
@set mlxScriptFolder=script


@set outputMeshOptions= -om vc fq wn

rem The meshlabserver program location:
@set meshlabserverPath="C:\Program Files\VCG\MeshLab\meshlabserver.exe"


rem ------------------------------------------------------
rem       List the Current Input Mesh Format
rem ------------------------------------------------------
echo ----------------------------------------------------------------
echo.
echo Processing meshes with the format:
echo %inputMeshFormat%
echo.

rem ------------------------------------------------------
rem            List the input Meshes
rem ------------------------------------------------------
echo.
echo ----------------------------------------------------------------
echo.
echo Input Folder Mesh List:
for %%X in (%inputFolder%\*.%inputMeshFormat%) do (echo "%%X")
rem To get help on the "for" syntax use: for /?
echo.
echo.
echo ----------------------------------------------------------------
echo.

rem Run the "for" loop from inside the input folder
cd %inputFolder%


for %%I in (*.%inputMeshFormat%) do (
   if %peronema% == %%I (
      echo %%I Perone maj
       %meshlabserverPath% -i %%I -o %inputFolder%\%%~nI.%outputMeshFormat% -s %mlxScriptFile% %outputMeshOptions%
      ) else (
             if %talusma% == %%I (
                echo %%I Talus ma
                 %meshlabserverPath% -i %%I -o %inputFolder%\%%~nI.%outputMeshFormat% -s %mlxScriptFile% %outputMeshOptions%
              ) else (
                 if %tibiama% == %%I (
                     echo %%I Tibia maj
                      %meshlabserverPath% -i %%I -o %inputFolder%\%%~nI.%outputMeshFormat% -s %mlxScriptFile% %outputMeshOptions%
                   ) else (
                         %meshlabserverPath% -i %%I -o %inputFolder%\%%~nI.%outputMeshFormat% -s %mlxScriptFileClean% %outputMeshOptions%
                   )
              )
    )
   )
rem To get help on the "for" syntax use: for /?

rem Go back down a directory
cd ..

rem ------------------------------------------------------
rem            List the Output Meshes
rem ------------------------------------------------------
echo.
echo ----------------------------------------------------------------

echo.
echo Output Folder Mesh List:

for %%X in (%inputFolder%\*.*) do (echo "%%X")
rem To get help on the "for" syntax use: for /?
echo.
rem ------------------------------------------------------
rem            Done Processing
rem ------------------------------------------------------
echo.
echo Script Complete
echo.
exit /b
